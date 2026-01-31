# Migração Definitiva para Service Account (Adeus `invalid_grant`)

O erro `invalid_grant` que você está vendo acontece porque seu App está em modo "Teste" no Google e os tokens expiram a cada 7 dias. Para resolver isso **definitivamente** e não precisar gerar tokens a cada 2 dias, mudaremos para **Service Account** (Conta de Serviço).

Isso elimina a necessidade de login humano e tokens que expiram.

## Passo 1: Criar a Conta de Serviço (Se ainda não fez)

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts).
2. Selecione seu projeto.
3. Clique em **+ CRIAR CONTA DE SERVIÇO**.
   - **Nome:** `uploader-site` (ou algo similar).
   - **ID:** Deixe como gerado.
4. Clique em **CRIAR E CONTINUAR**.
5. Em "Papel" (Role), escolha **Editor**.
6. Clique em **CONCLUIR**.

## Passo 2: Gerar a Chave (A "Senha" que nunca expira)

1. Na lista de contas de serviço, clique na que você acabou de criar (no email dela).
2. Vá na aba **CHAVES** (Keys).
3. Clique em **ADICIONAR CHAVE** > **Criar nova chave**.
4. Escolha **JSON** e clique em **CRIAR**.
5. Um arquivo `.json` será baixado. **Guarde-o com segurança!**

## Passo 3: Configurar o Google Drive

1. Abra o arquivo `.json` que baixou. Procure por `client_email`.
   - Exemplo: `uploader-site@seu-projeto.iam.gserviceaccount.com`
2. Vá no seu **Google Drive**, na pasta onde os orçamentos devem ser salvos (a pasta "Pai").
3. Clique com o botão direito na pasta > **Compartilhar**.
4. Cole o email da conta de serviço (`client_email`) e dê permissão de **Editor**.
5. **Importante:** Anote o ID dessa pasta (a parte final da URL) para usar na variável `GOOGLE_DRIVE_PARENT_FOLDER_ID`.

## Passo 4: Atualizar Variáveis de Ambiente

No seu arquivo `.env.local` (local) e nas **Environment Variables da Vercel** (produção), delete as variáveis antigas de OAuth (`CLIENT_ID`, `SECRET`, `REFRESH_TOKEN`) e adicione estas:

```ini
# Email da conta de serviço (está no JSON)
GOOGLE_CLIENT_EMAIL="uploader-site@seu-projeto.iam.gserviceaccount.com"

# A chave privada (está no JSON). COPIE TUDO, incluindo -----BEGIN... e ...END-----
# Se estiver colando na Vercel, cole o valor exato do JSON.
# Se for no .env local, coloque entre aspas duplas.
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nConteudoDaChave...\n-----END PRIVATE KEY-----\n"

# O ID da pasta que você compartilhou
GOOGLE_DRIVE_PARENT_FOLDER_ID="1xYz..."
```

## Passo 5: O Código

Eu já atualizei o arquivo `src/app/api/orcamento/route.ts` para usar este novo método. Assim que você configurar as variáveis acima, tudo voltará a funcionar e **não irá parar mais**.

```