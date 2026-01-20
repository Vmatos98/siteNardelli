// generate-refresh-token.js
const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config({ path: '.env' }); // Carrega as variáveis de .env

// --- CONFIGURAÇÃO ---
// Certifique-se de que estas variáveis estão no seu arquivo .env.local
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost'; // IMPORTANTE: Deve estar na lista de URIs autorizados no Google Cloud Console

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ ERRO: GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET devem estar definidos no arquivo .env.local');
  process.exit(1);
}

// Escopos necessários para a aplicação (apenas Drive neste caso)
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// 1. Criar cliente OAuth2
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// 2. Gerar a URL de consentimento
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'offline' é ESSENCIAL para obter um refresh_token
  scope: SCOPES,
  prompt: 'consent', // Força a exibição da tela de consentimento para garantir um novo refresh_token
});

console.log('✅ Siga os passos abaixo para gerar um novo Refresh Token:\n');
console.log('1. Copie e cole a seguinte URL no seu navegador:');
console.log('----------------------------------------------------');
console.log(authUrl);
console.log('----------------------------------------------------\n');
console.log('2. Faça login com sua Conta Google e autorize o acesso.');
console.log('3. Após autorizar, você será redirecionado para uma página em branco ou com erro (em http://localhost).');
console.log('4. Copie o VALOR do parâmetro "code" da URL na barra de endereço do navegador.');
console.log('   Exemplo: http://localhost/?code=ESTE_É_O_CÓDIGO_QUE_VOCÊ_PRECISA&scope=...\n');

// 3. Preparar para ler a entrada do usuário no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 4. Pedir o código ao usuário
rl.question('5. Cole o código aqui e pressione ENTER: ', async (code) => {
  if (!code) {
    console.error('❌ Nenhum código inserido. Abortando.');
    rl.close();
    process.exit(1);
  }

  try {
    console.log('\n🔄 Trocando o código de autorização por tokens...');
    
    // 5. Trocar o código pelo token de acesso e refresh token
    const { tokens } = await oauth2Client.getToken(code.trim());
    
    console.log('\n✅ Tokens recebidos com sucesso!');
    
    if (tokens.refresh_token) {
      console.log('\n🔑 Seu novo REFRESH TOKEN é:');
      console.log('----------------------------------------------------');
      console.log(tokens.refresh_token);
      console.log('----------------------------------------------------\n');
      console.log('🚀 ATUALIZE SUA VARIÁVEL DE AMBIENTE!');
      console.log('Copie este valor e atualize a variável GOOGLE_REFRESH_TOKEN no seu projeto Vercel.');
    } else {
      console.warn('\n⚠️ ATENÇÃO: Nenhum REFRESH TOKEN foi retornado.');
      console.log('Isso geralmente acontece se você já autorizou este app antes e não revogou o acesso.');
      console.log('Para forçar um novo refresh_token, remova o acesso do app da sua conta Google aqui:');
      console.log('https://myaccount.google.com/permissions');
      console.log('E então, rode este script novamente.');
    }

    console.log('\n(O access_token é: ', tokens.access_token, ')');

  } catch (err) {
    console.error('\n❌ ERRO ao tentar obter os tokens:', err.response ? err.response.data : err.message);
    if (err.response && err.response.data.error === 'invalid_grant') {
        console.error('💡 DICA: O código de autorização pode ter sido usado mais de uma vez ou expirou. Tente rodar o script novamente desde o início.');
    }
  } finally {
    rl.close();
  }
});
