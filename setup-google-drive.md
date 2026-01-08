# Configuração do Google Drive - Passo a Passo

## 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Select a project" → "New Project"
3. Nome do projeto: "Nardelli Usinagem Website"
4. Clique em "Create"

## 2. Ativar Google Drive API

1. No menu lateral, vá em "APIs & Services" → "Library"
2. Pesquise por "Google Drive API"
3. Clique na API e depois em "Enable"

## 3. Criar Conta de Serviço

1. Vá em "APIs & Services" → "Credentials"
2. Clique em "Create Credentials" → "Service Account"
3. Preencha:
   - Service account name: `nardelli-drive-service`
   - Service account ID: `nardelli-drive-service`
   - Description: `Service account para integração com Google Drive`
4. Clique em "Create and Continue"
5. Pule as próximas etapas clicando em "Done"

## 4. Gerar Chave da Conta de Serviço

1. Na lista de Service Accounts, clique no email da conta criada
2. Vá na aba "Keys"
3. Clique em "Add Key" → "Create New Key"
4. Selecione "JSON" e clique em "Create"
5. O arquivo JSON será baixado automaticamente

## 5. Criar Pasta no Google Drive

1. Acesse [Google Drive](https://drive.google.com)
2. Clique em "New" → "Folder"
3. Nome da pasta: "Nardelli Usinagem - Orçamentos"
4. Clique em "Create"

## 6. Compartilhar Pasta

1. Clique com o botão direito na pasta criada
2. Selecione "Share"
3. No campo "Add people and groups", cole o email da conta de serviço
   - Este email está no arquivo JSON baixado, campo `client_email`
   - Exemplo: `nardelli-drive-service@projeto-123456.iam.gserviceaccount.com`
4. Selecione "Editor" como permissão
5. Desmarque "Notify people" 
6. Clique em "Share"

## 7. Obter ID da Pasta

1. Abra a pasta no Google Drive
2. Na URL, copie o ID após `/folders/`
3. Exemplo: `https://drive.google.com/drive/folders/1ABC123DEF456GHI789JKL`
4. O ID é: `1ABC123DEF456GHI789JKL`

## 8. Configurar Variáveis de Ambiente

1. Abra o arquivo JSON baixado
2. Copie `.env.example` para `.env.local`
3. Preencha as variáveis:

```env
GOOGLE_CLIENT_EMAIL=nardelli-drive-service@seu-projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_PARENT_FOLDER_ID=1ABC123DEF456GHI789JKL
```

**Importante**: 
- Mantenha as quebras de linha (`\n`) na `GOOGLE_PRIVATE_KEY`
- Use aspas duplas para envolver a chave privada
- Não commite o arquivo `.env.local` no Git

## 9. Testar Integração

1. Execute o projeto: `npm run dev`
2. Acesse `http://localhost:3001/orcamento`
3. Preencha e envie um teste
4. Verifique se uma nova pasta foi criada no Google Drive com:
   - Nome: "Nome do Cliente - Empresa - Tipo de Peça - Data/Hora"
   - Arquivo de texto com os dados do orçamento
   - Arquivo anexado (se enviado)

## 10. Deploy na Vercel

1. Faça push do código para GitHub
2. Conecte o repositório na Vercel
3. Nas configurações do projeto na Vercel, adicione as Environment Variables:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` 
   - `GOOGLE_DRIVE_PARENT_FOLDER_ID`
4. Faça o deploy

## Estrutura dos Arquivos no Drive

Cada orçamento criará uma pasta com:
- **Nome da pasta**: `Nome Cliente - Empresa - Tipo Peça - Data/Hora`
- **Arquivo de dados**: `Orçamento - [dados].txt` com todas as informações
- **Arquivo anexado**: Desenho técnico ou foto (se enviado)

## Troubleshooting

### Erro 403 - Forbidden
- Verifique se a pasta foi compartilhada com o client_email
- Confirme se a Google Drive API está ativada

### Erro de autenticação
- Verifique se as credenciais estão corretas no .env.local
- Confirme se a chave privada mantém as quebras de linha

### Pasta não encontrada
- Verifique se o GOOGLE_DRIVE_PARENT_FOLDER_ID está correto
- Confirme se a pasta foi compartilhada com permissão de Editor