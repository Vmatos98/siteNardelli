import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';
import nodemailer from 'nodemailer';

// --- CONFIGURAÇÕES E HELPERS ---

function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

// Função de envio de e-mail (Auto-resposta para o Cliente)
async function enviarConfirmacaoCliente(dados: any) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Credenciais de e-mail não configuradas. Pulando envio.');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: `"Nardelli Usinagem" <${process.env.EMAIL_USER}>`,
      to: dados.email, // Envia DIRETAMENTE para o cliente
      // Opcional: Se você quiser receber uma cópia oculta para saber que chegou:
      // bcc: process.env.EMAIL_USER, 
      subject: `Recebemos sua solicitação de orçamento: ${dados.itemType}`,
      text: `Olá ${dados.nome},\n\nRecebemos sua solicitação e entraremos em contato em breve.\n\nAtenciosamente,\nEquipe Nardelli Usinagem`, // Versão texto puro
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #ea580c;">Solicitação Recebida</h2>
          
          <p>Olá <strong>${dados.nome}</strong>,</p>
          
          <p>Recebemos sua solicitação de orçamento para <strong>${dados.itemType}</strong> e entraremos em contato em breve.</p>
          
          <p>Seus dados e arquivos já foram encaminhados para nossa equipe técnica para análise.</p>
          
          <br>
          <p>Atenciosamente,<br>
          <strong>Equipe Nardelli Usinagem</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 E-mail de confirmação enviado para ${dados.email}`);

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
  }
}

// --- FUNÇÃO PRINCIPAL (API) ---

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 1. Extração de Dados
    const nome = formData.get('nome') as string;
    const empresa = formData.get('empresa') as string || 'Particular';
    const email = formData.get('email') as string;
    const telefone = formData.get('telefone') as string;
    const itemType = formData.get('itemType') as string;
    const observacoes = formData.get('observacoes') as string || '';
    const origem = formData.get('origem') as string || '';
    const arquivo = formData.get('arquivo') as File | null;

    // Campos Dinâmicos
    const camposIgnorar = ['nome', 'empresa', 'email', 'telefone', 'itemType', 'observacoes', 'origem', 'arquivo'];
    const dynamicFields: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      if (!camposIgnorar.includes(key) && value && value.toString().trim() !== '') {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
        dynamicFields[label] = value as string;
      }
    }

    console.log(`🚀 Processando: ${nome} - ${itemType}`);

    // 2. Configuração do Google Drive (OAuth2)
    // Nota: O Next.js lê o .env automaticamente
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
      throw new Error('Credenciais do Google Drive não configuradas no .env');
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    // 3. Criar Pasta
    const folderName = `[${itemType.toUpperCase()}] ${nome} - ${empresa}`;

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

    // 4. Salvar TXT
    const especificacoesTexto = Object.entries(dynamicFields)
      .map(([k, v]) => `• ${k}: ${v}`)
      .join('\n');

    const conteudoTxt = `
SOLICITAÇÃO DE ORÇAMENTO
Data: ${timestamp}
===================================
Nome:     ${nome}
Empresa:  ${empresa}
Email:    ${email}
Telefone: ${telefone}
Origem:   ${origem || 'Não informado'}

ESPECIFICAÇÕES (${itemType.toUpperCase()})
-----------------------
${especificacoesTexto}

OBSERVAÇÕES:
${observacoes}
    `.trim();

    const textStream = new Readable();
    textStream.push(conteudoTxt);
    textStream.push(null);

    await drive.files.create({
      requestBody: {
        name: 'DETALHES_DO_PEDIDO.txt',
        parents: [folderId!]
      },
      media: {
        mimeType: 'text/plain',
        body: textStream
      }
    });

    // 5. Upload Anexo
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

    // 6. Enviar Confirmação ao Cliente (Sem link do Drive)
    await enviarConfirmacaoCliente({
      nome, email, itemType
    });

    return NextResponse.json({
      success: true,
      message: 'Orçamento enviado com sucesso!',
      folderId
    });

  } catch (error: any) {
    console.error('❌ Erro crítico:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro interno' },
      { status: 500 }
    );
  }
}