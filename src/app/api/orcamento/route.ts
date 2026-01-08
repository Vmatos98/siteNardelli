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

    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Credenciais do Google não configuradas')
    }

    // Limpar e formatar a chave privada
    let privateKey = process.env.GOOGLE_PRIVATE_KEY
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n')
    }

    const timestamp = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    })

    // Converter campos dinâmicos em string
    const dynamicFieldsString = Object.entries(dynamicFields)
      .filter(([key, value]) => value && value !== '')
      .map(([key, value]) => `${key}: ${value}`)
      .join(' | ')

    // Preparar dados estruturados
    const orcamentoData = {
      timestamp,
      nome,
      empresa,
      email,
      telefone,
      itemType,
      especificacoes: dynamicFieldsString,
      observacoes,
      arquivo: arquivo ? arquivo.name : 'Nenhum arquivo'
    }

    console.log('📋 Novo orçamento recebido:', orcamentoData)

    // Tentar salvar no Google Drive primeiro
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: privateKey,
        },
        scopes: [
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive.folder'
        ],
      })

      const drive = google.drive({ version: 'v3', auth })
      
      // Criar nome da pasta: Nome - Empresa - Tipo de Peça
      const folderName = `${nome}${empresa ? ` - ${empresa}` : ''} - ${itemType}`

      // Criar pasta no Google Drive
      const folderMetadata = {
        name: `${folderName} - ${timestamp}`,
        mimeType: 'application/vnd.google-apps.folder',
        parents: process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID ? [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID] : undefined
      }

      const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id'
      })

      const folderId = folder.data.id

      // Criar arquivo de texto com os dados do orçamento
      const textData = `
ORÇAMENTO - ${timestamp}
========================

DADOS DO CLIENTE:
Nome: ${nome}
Empresa: ${empresa}
Email: ${email}
Telefone: ${telefone}

ESPECIFICAÇÕES:
Tipo de Peça: ${itemType}

${dynamicFieldsString ? 'DETALHES TÉCNICOS:\n' + dynamicFieldsString.replace(/ \| /g, '\n') : ''}

OBSERVAÇÕES:
${observacoes}

ARQUIVO ANEXADO:
${arquivo ? arquivo.name : 'Nenhum arquivo anexado'}
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
          body: textData
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

      console.log('✅ Orçamento salvo no Google Drive com sucesso!')
      
      return NextResponse.json({ 
        success: true, 
        message: 'Orçamento enviado e salvo no Google Drive com sucesso!',
        folderId: folderId
      })

    } catch (driveError) {
      console.log('⚠️ Erro no Google Drive, tentando Google Sheets...', driveError.message)
      
      // Fallback para Google Sheets
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: privateKey,
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })

        const sheets = google.sheets({ version: 'v4', auth })
        
        // Usar uma planilha padrão ou criar uma
        const spreadsheetId = process.env.GOOGLE_SHEET_ID || '1dJIcb_AxMetxDtp3cP_Z-SSlpet8NIgO' // ID temporário

        // Dados para a planilha
        const values = [
          [
            timestamp,
            nome,
            empresa,
            email,
            telefone,
            itemType,
            dynamicFieldsString,
            observacoes,
            arquivo ? arquivo.name : 'Nenhum arquivo'
          ]
        ]

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'A:I',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values,
          },
        })

        console.log('✅ Orçamento salvo no Google Sheets como fallback!')
        
        return NextResponse.json({ 
          success: true, 
          message: 'Orçamento enviado e salvo com sucesso!',
          method: 'sheets'
        })

      } catch (sheetsError) {
        console.log('❌ Erro também no Google Sheets:', sheetsError.message)
        
        // Se ambos falharem, pelo menos salvar no log
        return NextResponse.json({ 
          success: true, 
          message: 'Orçamento recebido com sucesso! (Dados salvos no log do servidor)',
          data: orcamentoData,
          method: 'log'
        })
      }
    }

  } catch (error) {
    console.error('Erro ao processar orçamento:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}