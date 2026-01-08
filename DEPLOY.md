# Guia de Deploy - Nardelli Usinagem

## 🚀 Deploy na Vercel (Recomendado)

### 1. Preparar o repositório
```bash
# Inicializar git (se ainda não foi feito)
git init
git add .
git commit -m "Initial commit - Nardelli Usinagem website"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/seu-usuario/nardelli-usinagem.git
git push -u origin main
```

### 2. Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Configure as variáveis de ambiente:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
5. Clique em "Deploy"

### 3. Configurar domínio personalizado (opcional)
1. No painel da Vercel, vá em "Settings" → "Domains"
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções da Vercel

## 🔧 Outras opções de deploy

### Netlify
```bash
# Build do projeto
npm run build

# Deploy manual
# Faça upload da pasta .next para Netlify
```

### Railway
1. Conecte seu repositório no Railway
2. Configure as variáveis de ambiente
3. Deploy automático

### DigitalOcean App Platform
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático

## ⚙️ Variáveis de ambiente necessárias

Certifique-se de configurar estas variáveis em sua plataforma de deploy:

```env
GOOGLE_CLIENT_EMAIL=sua-conta-servico@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=seu_id_da_planilha
```

## 📋 Checklist pré-deploy

- [ ] Google Sheets API configurada
- [ ] Planilha criada e compartilhada
- [ ] Variáveis de ambiente configuradas
- [ ] Build local funcionando (`npm run build`)
- [ ] Teste do formulário funcionando
- [ ] Repositório no GitHub atualizado

## 🔍 Verificações pós-deploy

1. **Teste a página inicial**: Verifique se carrega corretamente
2. **Teste o formulário**: Envie um orçamento de teste
3. **Verifique o Google Sheets**: Confirme se os dados foram salvos
4. **Teste responsividade**: Verifique em mobile e desktop
5. **Teste performance**: Use PageSpeed Insights

## 🐛 Troubleshooting comum

### Erro 500 na API
- Verifique se as variáveis de ambiente estão corretas
- Confirme se a planilha foi compartilhada com o client_email
- Verifique se a Google Sheets API está ativada

### Imagens não carregam
- Verifique se o logo.png está na pasta public/
- Confirme se as URLs externas estão acessíveis

### Formulário não envia
- Verifique o console do navegador para erros
- Confirme se a API route está funcionando
- Teste a conexão com Google Sheets

## 📊 Monitoramento

### Analytics (opcional)
Adicione Google Analytics ou similar para monitorar:
- Visitantes únicos
- Conversões de orçamento
- Páginas mais visitadas
- Tempo de permanência

### Logs de erro
Configure monitoramento de erros com:
- Sentry
- LogRocket
- Vercel Analytics

## 🔄 Atualizações futuras

Para atualizar o site:
1. Faça as alterações no código
2. Commit e push para o repositório
3. Deploy automático será acionado
4. Teste as alterações no ambiente de produção

## 📞 Suporte técnico

Em caso de problemas técnicos:
1. Verifique os logs da plataforma de deploy
2. Teste localmente primeiro
3. Consulte a documentação do Next.js
4. Verifique a documentação da Google Sheets API