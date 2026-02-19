const { google } = require('googleapis');
require('dotenv').config();

async function verifyPhotosAuth() {
    console.log('🔍 Diagnosticando Autenticação Google Photos (Extensão)...\n');

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID_PHOTOS;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET_PHOTOS;
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN_PHOTOS;

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        console.error('\n❌ ERRO: Variáveis de ambiente faltando no .env');
        return;
    }

    // Imprimir primeiros caracteres para garantir que não tem espaços extras
    console.log('Client ID (parcial):', CLIENT_ID.substring(0, 15) + '...');

    // Tentar extrair o Project Number do Client ID
    const projectNumberMatch = CLIENT_ID.match(/^(\d+)-/);
    const projectNumber = projectNumberMatch ? projectNumberMatch[1] : 'Desconhecido';
    console.log('Project Number (extraído do Client ID):', projectNumber);
    console.log('👉 VOCÊ DEVE ATIVAR A API NESTE PROJETO!');

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        'http://localhost'
    );

    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
    });

    try {
        console.log('\n🔄 Obtendo Access Token...');
        const { token } = await oauth2Client.getAccessToken();
        console.log('✅ Access Token obtido.');

        // Verificar detalhes completos do token
        console.log('\n🕵️  Consultando detalhes do token na API do Google...');
        const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);

        if (!tokenInfoRes.ok) {
            console.error('❌ Erro ao consultar tokeninfo:', await tokenInfoRes.text());
            return;
        }

        const tokenInfo = await tokenInfoRes.json();
        console.log('--- Resposta da API de Token Info ---');
        console.log(JSON.stringify(tokenInfo, null, 2));
        console.log('-------------------------------------');

        if (tokenInfo.azp !== CLIENT_ID) {
            console.warn('\n⚠️  ALERTA: O "azp" (Authorized Party) do token NÃO bate com seu Client ID!');
            console.warn(`Esperado: ${CLIENT_ID}`);
            console.warn(`Recebido: ${tokenInfo.azp}`);
            console.warn('Isso sugere que o Refresh Token foi gerado para OUTRO aplicativo/projeto.');
        } else {
            console.log('\n✅ "azp" (Authorized Party) confere com o Client ID.');
        }

        // Tentar listar álbuns novamente
        console.log('\n📸 Tentando listar álbuns...');
        const response = await fetch('https://photoslibrary.googleapis.com/v1/albums?pageSize=1', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
            console.log('✅ SUCESSO! A API respondeu corretamente com 200 OK.');
            const data = await response.json();
            console.log(`📚 Álbuns encontrados: ${data.albums ? data.albums.length : 0}`);
        } else {
            const errorText = await response.text();
            console.error(`\n❌ Falha PERSISTENTE na API (${response.status}):`);
            console.error(errorText);
            console.log('\n💡 Se o erro for 403 mesmo com o escopo correto, certifique-se de que a API está ativada no projeto ' + projectNumber);
            console.log('Link direto para ativar (substitua PROJECT_ID pelo ID do seu projeto se souber, ou procure pelo número):');
            console.log(`https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com?project=${projectNumber}`);
        }

    } catch (error) {
        console.error('\n❌ Erro durante o diagnóstico:', error.message);
    }
}

verifyPhotosAuth();
