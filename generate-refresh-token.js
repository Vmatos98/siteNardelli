// generate-refresh-token.js
const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config({ path: '.env' }); // Garante ler do .env.local

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ ERRO: Verifique CLIENT_ID e CLIENT_SECRET no .env.local');
  process.exit(1);
}

// Para Apps Desktop, usamos o loopback ou oob
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID, 
  CLIENT_SECRET, 
  'http://localhost' // Pode manter localhost para desktop também
);

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent', // Força gerar um refresh token novo
});

console.log('✅ URL DE AUTORIZAÇÃO (Use uma janela anônima para garantir a conta certa):');
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nCole o código (code=...) aqui: ', async (code) => {
  try {
    // Decodifica o código caso venha com URL encoded characters
    const decodedCode = decodeURIComponent(code);
    
    const { tokens } = await oauth2Client.getToken(decodedCode);
    
    console.log('\n✅ SUCESSO! Aqui está seu token eterno:');
    console.log('------------------------------------------------');
    console.log('GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
    console.log('------------------------------------------------');
    console.log('Copie a linha acima para o seu .env.local e para a Vercel.');

  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    rl.close();
  }
});