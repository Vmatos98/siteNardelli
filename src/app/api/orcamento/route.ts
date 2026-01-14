import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Readable } from 'stream'

// Função auxiliar para converter Buffer em Stream
function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // 1. Campos Padrão (Fixos)
    const nome = formData.get('nome') as string
    const empresa = formData.get('empresa') as string || 'Não informada'
    const email = formData.get('email') as string
    const telefone = formData.get('telefone') as string
    const itemType = formData.get('itemType') as string
    const observacoes = formData.get('observacoes') as string || 'Nenhuma observação'
    const arquivo = formData.get('arquivo') as File | null
    
    // 2. Captura INTELIGENTE dos campos dinâmicos
    // Criamos uma lista negra apenas dos campos que já pegamos acima
    const camposPadrao = ['nome', 'empresa', 'email', 'telefone', 'itemType', 'observacoes', 'arquivo'];
    
    const dynamicFields: { [key: string]: string } = {}
    
    // Iteramos sobre TUDO que veio do formulário
    for (const [key, value] of formData.entries()) {
      // Se a chave NÃO for um campo padrão e tiver valor preenchido
      if (!camposPadrao.includes(key) && value && value.toString().trim() !== '') {
        // Formata a chave para ficar bonita no texto (ex: dimensao_diametro -> Dimensao Diametro)
        const labelFormatada = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
        dynamicFields[labelFormatada] = value as string;
      }
    }

    // LOG DE DEBUG (Olhe isso no seu terminal quando enviar)
    console.log("--- DADOS RECEBIDOS ---");
    console.log("Cliente:", nome);
    console.log("Peça:", itemType);
    console.log("Campos Específicos detectados:", dynamicFields); // <--- Verifique se seus dados aparecem aqui

    // --- CONFIGURAÇÃO OAUTH2 (A mesma que já funcionou) ---
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    
    // Nome da Pasta: NOME - EMPRESA - TIPO DE PEÇA
    const folderName = `${nome} - ${empresa} - ${itemType.toUpperCase()}`;

    // 3. Criar Pasta
    const folderMetadata = {
      name: `${folderName} - ${timestamp}`,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID!]
    };

    const folder = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id'
    });

    const folderId = folder.data.id;

    // 4. Montar o Texto do Arquivo (Com formatação melhorada)
    // Transforma o objeto dynamicFields em texto lista
    const especificacoesTexto = Object.entries(dynamicFields)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n');

    const textData = `
SOLICITAÇÃO DE ORÇAMENTO
Data: ${timestamp}
===================================

DADOS DO CLIENTE
-----------------------------------
Nome:     ${nome}
Empresa:  ${empresa}
Email:    ${email}
Telefone: ${telefone}

DADOS DA PEÇA (${itemType.toUpperCase()})
-----------------------------------
${especificacoesTexto}

OBSERVAÇÕES GERAIS
-----------------------------------
${observacoes}
    `.trim();

    const textStream = new Readable();
    textStream.push(textData);
    textStream.push(null);

    // Salvar arquivo de texto
    await drive.files.create({
      requestBody: {
        name: 'DETALHES_DO_PEDIDO.txt', // Nome mais claro
        parents: [folderId!]
      },
      media: {
        mimeType: 'text/plain',
        body: textStream
      }
    });

    // 5. Salvar Imagem (Se houver)
    if (arquivo && arquivo.size > 0) {
      const arrayBuffer = await arquivo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileStream = bufferToStream(buffer);

      await drive.files.create({
        requestBody: {
          name: arquivo.name,
          parents: [folderId!]
        },
        media: {
          mimeType: arquivo.type,
          body: fileStream
        }
      });
    }

    return NextResponse.json({ success: true, folderId });

  } catch (error: any) {
    console.error('❌ Erro no servidor:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}