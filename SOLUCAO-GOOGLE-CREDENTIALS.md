# Solução para Problemas de Credenciais do Google

## 🚨 Problema Identificado

O erro `DECODER routines::unsupported` indica que há um problema com a chave privada do Google ou com a configuração da API.

## ✅ Solução Implementada (Temporária)

Por enquanto, implementei uma versão simplificada da API que:

1. **Recebe todos os dados do formulário** (incluindo arquivos)
2. **Processa e valida** as informações
3. **Salva no log do servidor** para verificação
4. **Retorna sucesso** para o usuário

## 🔧 Para Configurar o Google Drive Corretamente

### Passo 1: Verificar APIs Ativadas

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Vá em "APIs & Services" → "Enabled APIs"
3. Certifique-se que estão ativadas:
   - **Google Drive API**
   - **Google Sheets API** (como fallback)

### Passo 2: Recriar Conta de Serviço

1. Vá em "IAM & Admin" → "Service Accounts"
2. **Delete** a conta existente se houver problemas
3. Crie uma nova conta:
   - Nome: `nardelli-website-service`
   - Descrição: `Service account para website Nardelli`
4. **Baixe nova chave JSON**

### Passo 3: Configurar Permissões

1. Na conta de serviço criada, vá em "Keys"
2. Adicione as roles:
   - **Editor** (para Google Drive)
   - **Service Account User**

### Passo 4: Testar Credenciais

Execute o script de teste:

```bash
node test-google-auth.js
```

### Passo 5: Atualizar Variáveis de Ambiente

No arquivo `.env`, use a nova chave:

```env
GOOGLE_CLIENT_EMAIL=nova-conta@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nNOVA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_PARENT_FOLDER_ID=id_da_pasta
```

## 🔄 Versões da API

### Versão Atual (Funcionando)
- ✅ Recebe dados do formulário
- ✅ Processa campos dinâmicos
- ✅ Lida com upload de arquivos
- ✅ Salva no log do servidor
- ✅ Retorna feedback ao usuário

### Versão Futura (Google Drive)
- 📁 Cria pasta para cada orçamento
- 📄 Salva arquivo de texto com dados
- 📎 Salva arquivos anexados
- 🔗 Retorna link da pasta criada

## 🧪 Como Testar

1. **Acesse**: http://localhost:3001/orcamento
2. **Preencha** o formulário completo
3. **Anexe** um arquivo (opcional)
4. **Envie** o orçamento
5. **Verifique** o console do servidor para ver os dados

## 📊 Dados Capturados

O sistema já captura corretamente:

```json
{
  "timestamp": "08/01/2026 15:30:45",
  "nome": "João Silva",
  "empresa": "Empresa XYZ",
  "email": "joao@empresa.com",
  "telefone": "(11) 99999-9999",
  "itemType": "engrenagem",
  "especificacoes": "tipo: Dentes Retos | z: 24 | material: Aço Carbono",
  "observacoes": "Urgente para próxima semana",
  "arquivo": "desenho-tecnico.pdf"
}
```

## 🚀 Próximos Passos

1. **Resolver credenciais** do Google seguindo os passos acima
2. **Ativar salvamento** no Google Drive
3. **Testar upload** de arquivos
4. **Deploy** na Vercel com variáveis corretas

## 💡 Alternativas

Se o Google Drive continuar com problemas:

1. **Google Sheets**: Mais simples de configurar
2. **Banco de dados**: PostgreSQL/MySQL na Vercel
3. **Email**: Enviar dados por email usando Resend/SendGrid
4. **Webhook**: Integrar com Zapier/Make.com

## 🆘 Suporte

Se precisar de ajuda:

1. Execute `node test-google-auth.js`
2. Verifique os logs no console
3. Confirme se as APIs estão ativadas
4. Teste com uma nova conta de serviço