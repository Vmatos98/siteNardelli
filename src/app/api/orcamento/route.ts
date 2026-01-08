import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extrair dados do formulário
    const nome = formData.get('nome') as string
    const empresa = formData.get('empresa') as string || ''
    const email = formData.get('email') as string
    const telefone = formData.get('telefone') as string
    const itemType = formData.get('itemType') as string
    const observacoes = formData.get('observacoes') as string || ''
    const arquivo = formData.get('arquivo') as File | null
    
    // Extrair campos dinâmicos
    const dynamicFields: { [key: string]: string } = {}
    for (const [key, value] of formData.entries()) {
      if (!['nome', 'empresa', 'email', 'telefone', 'itemType', 'observacoes', 'arquivo'].includes(key)) {
        dynamicFields[key] = value as string
      }
    }

    // Configuração do Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.folder'
      ],
    })

    const drive = google.drive({ version: 'v3', auth })
    
    // Criar nome da pasta: Nome - Empresa - Tipo de Peça
    const folderName = `${nome}${empresa ? ` - ${empresa}` : ''} - ${itemType}`
    const timestamp = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    })

    // Criar pasta no Google Drive
    const folderMetadata = {
      name: `${folderName} - ${timestamp}`,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || 'root']
    }

    const folder = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id'
    })

    const folderId = folder.data.id

    // Criar arquivo de texto com os dados do orçamento
    const orcamentoData = `
ORÇAMENTO - ${timestamp}
========================

DADOS DO CLIENTE:
Nome: ${nome}
Empresa: ${empresa}
Email: ${email}
Telefone: ${telefone}

ESPECIFICAÇÕES:
Tipo de Peça: ${itemType}

${Object.entries(dynamicFields).length > 0 ? 'DETALHES TÉCNICOS:\n' + Object.entries(dynamicFields).map(([key, value]) => `${key}: ${value}`).join('\n') : ''}

OBSERVAÇÕES:
${observacoes}
    `.trim()

    // Upload do arquivo de dados
    const dataFileMetadata = {
      name: `Orçamento - ${folderName}.txt`,
      parents: folderId ? [folderId] : undefined
    }

    await drive.files.create({
      requestBody: dataFileMetadata,
      media: {
        mimeType: 'text/plain',
        body: orcamentoData
      }
    })

    // Upload do arquivo anexado (se existir)
    if (arquivo && arquivo.size > 0) {
      const buffer = Buffer.from(await arquivo.arrayBuffer())
      
      const fileMetadata = {
        name: arquivo.name,
        parents: folderId ? [folderId] : undefined
      }

      await drive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: arquivo.type,
          body: buffer
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Orçamento enviado com sucesso!',
      folderId: folderId
    })

  } catch (error) {
    console.error('Erro ao salvar no Google Drive:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}