const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID_PHOTOS;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET_PHOTOS;
// Tenta usar http://localhost:3000 por padrão, pois é comum em projetos Next.js
// Se o seu Google Cloud Console tiver apenas http://localhost, mude para http://localhost
const REDIRECT_URI = 'http://localhost:3000';

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('❌ ERRO: Verifique GOOGLE_CLIENT_ID_PHOTOS e GOOGLE_CLIENT_SECRET_PHOTOS no .env');
    process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const SCOPES = [
    'https://www.googleapis.com/auth/photoslibrary.readonly'
];

const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
});

console.log(`
================================================================================
GERADOR DE TOKEN PARA GOOGLE PHOTOS (ATUALIZADO)
================================================================================

URI de Redirecionamento configurada no script: ${REDIRECT_URI}

IMPORTANTE: 
Para este script funcionar, você precisa ir no Google Cloud Console:
1. APIs & Services > Credentials
2. Editar o ID do cliente OAuth 2.0 que você criou.
3. Em "Authorized redirect URIs", ADICIONE EXATAMENTE:
   ${REDIRECT_URI}
4. Salve e aguarde alguns segundos.

--------------------------------------------------------------------------------

1. Acesse a URL abaixo no seu navegador (de preferência em aba anônima):

${authUrl}

2. Faça login e autorize o app.
3. Você será redirecionado para um endereço começando com ${REDIRECT_URI}/?code=...
   - Se der erro de "Site não encontrado" ou 404 no navegador, NÃO TEM PROBLEMA.
   - O importante é copiar o parâmetro 'code' da URL no navegador.

`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Cole o código (tudo depois de code= e antes de &scope...): ', async (code) => {
    try {
        const decodedCode = decodeURIComponent(code);

        console.log('\n🔄 Trocando código por tokens...');
        const { tokens } = await oauth2Client.getToken(decodedCode);

        console.log('\n✅ SUCESSO! Aqui está seu novo Refresh Token:');
        console.log('------------------------------------------------');
        console.log('GOOGLE_REFRESH_TOKEN_PHOTOS=' + tokens.refresh_token);
        console.log('------------------------------------------------');
        console.log(' Substitua este valor no seu arquivo .env');

    } catch (err) {
        console.error('\n❌ Erro ao obter token:', err.message);
        if (err.response) {
            console.error('Detalhes do erro:', err.response.data);
        }
        console.log('\n⚠️  Se o erro for "redirect_uri_mismatch", verifique se a URL acima está no Console do Google Cloud.');
    } finally {
        rl.close();
    }
});
