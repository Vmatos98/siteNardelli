const { google } = require('googleapis');
require('dotenv').config({ path: '.env' });

async function testGoogleAuth() {
  try {
    console.log('🔍 Testando autenticação do Google Drive...\n');
    
    // Verificar variáveis de ambiente
    console.log('📋 Verificando variáveis de ambiente:');
    console.log('GOOGLE_CLIENT_EMAIL:', process.env.GOOGLE_CLIENT_EMAIL ? '✅ Configurado' : '❌ Não configurado');
    console.log('GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? '✅ Configurado' : '❌ Não configurado');
    console.log('GOOGLE_DRIVE_PARENT_FOLDER_ID:', process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID ? '✅ Configurado' : '❌ Não configurado');
    
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('\n❌ Erro: Variáveis de ambiente não configuradas');
      console.log('Certifique-se de ter um arquivo .env.local com as credenciais');
      return;
    }

    // Limpar e formatar a chave privada
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    console.log('\n🔐 Configurando autenticação...');
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.folder'
      ],
    });

    const drive = google.drive({ version: 'v3', auth });
    
    console.log('📁 Testando acesso ao Google Drive...');
    
    // Testar listagem de arquivos
    const response = await drive.files.list({
      pageSize: 1,
      fields: 'files(id, name)',
    });

    console.log('✅ Autenticação bem-sucedida!');
    console.log('📊 Arquivos encontrados:', response.data.files?.length || 0);
    
    // Testar acesso à pasta pai (se configurada)
    if (process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID) {
      console.log('\n📂 Testando acesso à pasta pai...');
      try {
        const folderResponse = await drive.files.get({
          fileId: process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID,
          fields: 'id, name, mimeType'
        });
        
        console.log('✅ Pasta pai encontrada:', folderResponse.data.name);
        console.log('🆔 ID:', folderResponse.data.id);
      } catch (folderError) {
        console.log('❌ Erro ao acessar pasta pai:', folderError.message);
        console.log('Verifique se a pasta foi compartilhada com:', process.env.GOOGLE_CLIENT_EMAIL);
      }
    }
    
    console.log('\n🎉 Teste concluído com sucesso!');
    
  } catch (error) {
    console.log('\n❌ Erro na autenticação:', error.message);
    
    if (error.message.includes('DECODER routines')) {
      console.log('\n💡 Dica: O erro indica problema na chave privada.');
      console.log('Verifique se a GOOGLE_PRIVATE_KEY está correta e com quebras de linha (\\n)');
      console.log('Exemplo: "-----BEGIN PRIVATE KEY-----\\nSUA_CHAVE\\n-----END PRIVATE KEY-----\\n"');
    } else if (error.message.includes('403')) {
      console.log('\n💡 Dica: Erro de permissão.');
      console.log('Verifique se a Google Drive API está ativada no Google Cloud Console');
      console.log('E se a pasta foi compartilhada com:', process.env.GOOGLE_CLIENT_EMAIL);
    }
  }
}

testGoogleAuth();