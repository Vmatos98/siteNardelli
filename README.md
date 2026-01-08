# Nardelli Usinagem - Website Next.js

Website moderno e responsivo para a Nardelli Usinagem, desenvolvido com Next.js 14, TypeScript e Tailwind CSS, com integração ao Google Sheets para captura de orçamentos.

## 🚀 Funcionalidades

- **Página inicial moderna** com informações da empresa
- **Formulário de orçamento dinâmico** com campos específicos por tipo de peça
- **Upload de arquivos** para desenhos técnicos e fotos
- **Integração com Google Drive** para organizar orçamentos em pastas
- **Design responsivo** otimizado para desktop e mobile
- **Performance otimizada** com Next.js App Router
- **Serverless** - pronto para deploy na Vercel

## 🛠️ Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Drive API
- Multer (upload de arquivos)

## 📋 Pré-requisitos

- Node.js 18+ 
- Conta Google (para Google Drive API)
- Conta Vercel (para deploy)

## ⚙️ Configuração do Google Drive

### 1. Criar projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Drive API**

### 2. Criar conta de serviço

1. Vá para **IAM & Admin > Service Accounts**
2. Clique em **Create Service Account**
3. Preencha os dados e clique em **Create**
4. Na seção **Keys**, clique em **Add Key > Create New Key**
5. Escolha **JSON** e baixe o arquivo

### 3. Configurar pasta no Drive

1. Crie uma nova pasta no [Google Drive](https://drive.google.com)
2. Renomeie para **"Nardelli Usinagem - Orçamentos"**
3. Compartilhe a pasta com o email da conta de serviço (client_email do JSON)
4. Dê permissão de **Editor**
5. Copie o ID da pasta da URL (após `/folders/`)

### 4. Configurar variáveis de ambiente

1. Copie `.env.example` para `.env.local`
2. Preencha com os dados do arquivo JSON:
   - `GOOGLE_CLIENT_EMAIL`: campo "client_email"
   - `GOOGLE_PRIVATE_KEY`: campo "private_key" (mantenha as quebras de linha)
   - `GOOGLE_DRIVE_PARENT_FOLDER_ID`: ID da pasta criada

## 🚀 Instalação e Execução

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd nardelli-usinagem

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Executar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático a cada push

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   └── orcamento/
│   │       └── route.ts          # API para Google Sheets
│   ├── orcamento/
│   │   └── page.tsx              # Página de orçamento
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página inicial
└── components/                   # Componentes reutilizáveis (futuro)
```

## 🎨 Personalização

### Cores
As cores principais estão definidas no Tailwind CSS:
- Laranja: `orange-600` (#EA580C)
- Cinza: `slate-900`, `slate-800`, etc.

### Formulário
Para adicionar novos tipos de peças, edite o objeto `formConfig` em `/src/app/orcamento/page.tsx`.

### Conteúdo
Textos e informações podem ser editados diretamente nos componentes React.

## 📊 Dados Capturados

O formulário captura e organiza:
- **Dados pessoais**: Nome, empresa, email, telefone
- **Tipo de peça**: Engrenagem, eixo, polia, etc.
- **Especificações técnicas**: Campos dinâmicos baseados no tipo
- **Observações**: Campo livre para detalhes adicionais
- **Arquivos**: Desenhos técnicos, fotos ou documentos

### Organização no Google Drive
Cada orçamento cria uma pasta com nome:
`Nome Cliente - Empresa - Tipo Peça - Data/Hora`

Contendo:
- Arquivo de texto com todos os dados
- Arquivos anexados pelo cliente

## 🔒 Segurança

- Variáveis de ambiente protegidas
- Validação de dados no frontend e backend
- Rate limiting (implementar se necessário)
- CORS configurado adequadamente

## 🐛 Troubleshooting

### Erro de autenticação Google
- Verifique se as credenciais estão corretas
- Confirme se a pasta foi compartilhada com o client_email
- Verifique se a Google Drive API está ativada

### Erro de CORS
- Confirme se está usando a API route do Next.js
- Verifique se as variáveis de ambiente estão configuradas

## 📞 Suporte

Para dúvidas sobre o código, abra uma issue no repositório.
Para questões comerciais, entre em contato com a Nardelli Usinagem:
- Telefone: +55 (79) 3205-2272
- Email: comercial@nardelliusinagem.com

## 📄 Licença

Este projeto foi desenvolvido especificamente para a Nardelli Usinagem.