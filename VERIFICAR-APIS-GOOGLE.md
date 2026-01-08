# ✅ Verificar APIs do Google Cloud

## 🔍 Problema Atual
As credenciais estão configuradas, mas ainda há erro de autenticação. Isso geralmente indica que as APIs não estão ativadas.

## 📋 Checklist de Verificação

### 1. Acessar Google Cloud Console
1. Vá para [console.cloud.google.com](https://console.cloud.google.com)
2. Selecione o projeto: **nardelli-usinagem-website**

### 2. Verificar APIs Ativadas
1. No menu lateral, clique em **"APIs & Services"**
2. Clique em **"Enabled APIs & services"**
3. Verifique se estas APIs estão na lista:
   - ✅ **Google Drive API**
   - ✅ **Google Sheets API**

### 3. Ativar APIs (se necessário)
Se alguma API não estiver ativada:

1. Clique em **"+ ENABLE APIS AND SERVICES"**
2. Pesquise por **"Google Drive API"**
3. Clique na API e depois em **"ENABLE"**
4. Repita para **"Google Sheets API"**

### 4. Verificar Conta de Serviço
1. Vá em **"IAM & Admin"** → **"Service Accounts"**
2. Encontre: `nardelli-drive-service@nardelli-usinagem-website.iam.gserviceaccount.com`
3. Clique nos 3 pontos → **"Manage keys"**
4. Verifique se existe uma chave ativa

### 5. Testar Novamente
Após ativar as APIs, teste:

```bash
node test-google-auth.js
```

## 🎯 Resultado Esperado

Após ativar as APIs, você deve ver:

```
✅ Autenticação bem-sucedida!
📊 Arquivos encontrados: X
✅ Pasta pai encontrada: Nardelli Usinagem - Orçamentos
```

## 🚀 Próximo Teste

Depois que as APIs estiverem funcionando:

1. Acesse: http://localhost:3001/orcamento
2. Preencha um orçamento de teste
3. Verifique se aparece no Google Drive

## 📞 Se Ainda Não Funcionar

Tente estas soluções:

1. **Recriar conta de serviço** com novo nome
2. **Usar projeto diferente** no Google Cloud
3. **Verificar cotas** da API (pode estar limitada)
4. **Aguardar 5-10 minutos** após ativar APIs

## 💡 Dica Importante

As APIs do Google podem levar alguns minutos para ficarem totalmente ativas após serem habilitadas. Se ainda der erro, aguarde um pouco e teste novamente.