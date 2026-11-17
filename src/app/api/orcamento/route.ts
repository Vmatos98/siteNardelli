import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';
import nodemailer from 'nodemailer';
import path from 'path';

// --- CONFIGURAÇÕES E HELPERS ---

function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export interface DadosConfirmacaoCliente {
  nome: string;
  email: string;
  itemType: string;
}

export interface DadosOrcamentoNotificacao {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  itemType: string;
  quantidade?: string;
  prazo?: string;
  observacoes?: string;
  origem?: string;
  dynamicFields?: Record<string, string>;
  timestamp: string;
  folderId?: string;
}

export interface AnexoOrcamento {
  filename: string;
  content: Buffer;
  contentType: string;
}

// Função de envio de e-mail (Auto-resposta para o Cliente)
export async function enviarConfirmacaoCliente(dados: DadosConfirmacaoCliente) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Credenciais de e-mail não configuradas. Pulando envio de confirmação.');
      return;
    }

    const emailEmpresa = process.env.EMAIL_NOTIFICACAO_ORCAMENTO || process.env.EMAIL_NOTIFICACAO_VAGAS || process.env.EMAIL_USER;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: `"Nardelli Usinagem" <${process.env.EMAIL_ALIAS || process.env.EMAIL_USER}>`,
      to: dados.email,
      replyTo: emailEmpresa,
      subject: `Recebemos sua solicitação de orçamento: ${dados.itemType}`,
      text: `Olá ${dados.nome},\n\nRecebemos sua solicitação de orçamento para ${dados.itemType} e entraremos em contato em breve.\n\nAtenciosamente,\nEquipe Nardelli Usinagem`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:logonardelli" alt="Nardelli Usinagem" style="max-width: 180px; height: auto;" />
          </div>

          <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #ea580c; margin-top: 0;">Solicitação Recebida</h2>
            
            <p>Olá <strong>${dados.nome}</strong>,</p>
            
            <p>Recebemos sua solicitação de orçamento para <strong>${dados.itemType}</strong> e entraremos em contato em breve.</p>
            
            <p>Seus dados e arquivos já foram encaminhados para nossa equipe técnica para análise.</p>
            
            <br>
            <p style="margin-bottom: 0;">Atenciosamente,<br>
            <strong>Equipe Nardelli Usinagem</strong></p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'logo v1.png',
          path: path.join(process.cwd(), 'public', 'assets', 'logo v1.png'),
          cid: 'logonardelli'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 E-mail de confirmação enviado para o cliente: ${dados.email}`);
  } catch (error) {
    console.error('❌ Erro ao enviar email para o cliente:', error);
  }
}

// Função de envio de e-mail com todos os dados do orçamento para a empresa / proprietário
export async function enviarNotificacaoEmpresaOrcamento(
  dados: DadosOrcamentoNotificacao,
  anexo?: AnexoOrcamento
) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Credenciais de e-mail não configuradas. Pulando envio de notificação para a empresa.');
      return;
    }

    const emailEmpresa = process.env.EMAIL_NOTIFICACAO_ORCAMENTO || process.env.EMAIL_NOTIFICACAO_VAGAS || process.env.EMAIL_USER;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false }
    });

    const attachments: Array<{ filename: string; path?: string; content?: Buffer; contentType?: string; cid?: string }> = [
      {
        filename: 'logo v1.png',
        path: path.join(process.cwd(), 'public', 'assets', 'logo v1.png'),
        cid: 'logonardelli'
      }
    ];

    if (anexo) {
      attachments.push({
        filename: anexo.filename,
        content: anexo.content,
        contentType: anexo.contentType
      });
    }

    const dynamicRows = dados.dynamicFields && Object.keys(dados.dynamicFields).length > 0
      ? Object.entries(dados.dynamicFields)
          .map(([key, value]) => `
            <tr>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; width: 35%;">${key}</td>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${value}</td>
            </tr>
          `).join('')
      : '';

    const especificacoesTexto = dados.dynamicFields && Object.keys(dados.dynamicFields).length > 0
      ? Object.entries(dados.dynamicFields).map(([k, v]) => `• ${k}: ${v}`).join('\n')
      : 'Nenhuma especificação técnica adicional informada.';

    const telefoneLimpo = dados.telefone.replace(/\D/g, '');

    const mailOptions = {
      from: `"Nardelli Usinagem - Orçamentos" <${process.env.EMAIL_ALIAS || process.env.EMAIL_USER}>`,
      to: emailEmpresa,
      replyTo: dados.email,
      subject: `[Novo Orçamento] ${dados.itemType} - ${dados.nome}${dados.empresa && dados.empresa !== 'Particular' ? ` (${dados.empresa})` : ''}`,
      text: `NOVA SOLICITAÇÃO DE ORÇAMENTO RECEBIDA!\n\n` +
        `Peça/Item: ${dados.itemType}\n` +
        `Nome: ${dados.nome}\n` +
        `Empresa: ${dados.empresa || 'Particular'}\n` +
        `E-mail: ${dados.email}\n` +
        `Telefone: ${dados.telefone}\n` +
        `Origem: ${dados.origem || 'Não informado'}\n` +
        `Quantidade: ${dados.quantidade || 'Não informada'}\n` +
        `Prazo: ${dados.prazo || 'Não informado'}\n` +
        `Data/Hora: ${dados.timestamp}\n\n` +
        `ESPECIFICAÇÕES TÉCNICAS:\n${especificacoesTexto}\n\n` +
        `OBSERVAÇÕES:\n${dados.observacoes || 'Nenhuma'}\n\n` +
        (anexo ? `Arquivo Anexado: ${anexo.filename}\n` : 'Nenhum arquivo anexado.\n') +
        (dados.folderId ? `Pasta Google Drive: https://drive.google.com/drive/folders/${dados.folderId}\n` : ''),
      html: `
        <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 650px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:logonardelli" alt="Nardelli Usinagem" style="max-width: 180px; height: auto;" />
          </div>

          <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            <div style="background-color: #ea580c; color: #ffffff; text-align: center; padding: 8px 12px; font-weight: bold; border-radius: 4px; margin-bottom: 16px; font-size: 14px;">
              🚨 NOVA SOLICITAÇÃO DE ORÇAMENTO
            </div>

            <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">
              Item Solicitado: <span style="color: #ea580c;">${dados.itemType}</span>
            </h2>
            <p style="color: #64748b; font-size: 13px; margin-top: -10px; margin-bottom: 20px;">
              Data/Hora da solicitação: ${dados.timestamp}
            </p>

            <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 13px; border-radius: 4px; margin-top: 20px;">
              1. Dados do Cliente e Contato
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; width: 35%;">Nome Completo</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;"><strong>${dados.nome}</strong></td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Empresa</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.empresa || 'Particular'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">E-mail</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">
                  <a href="mailto:${dados.email}" style="color: #ea580c; text-decoration: none;">${dados.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Telefone / WhatsApp</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">
                  <a href="https://wa.me/${telefoneLimpo}" target="_blank" style="color: #16a34a; font-weight: bold; text-decoration: none;">
                    ${dados.telefone} 💬 (Abrir no WhatsApp)
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Como nos conheceu</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.origem || 'Não informado'}</td>
              </tr>
            </table>

            <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 13px; border-radius: 4px; margin-top: 20px;">
              2. Informações Gerais do Pedido
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; width: 35%;">Tipo de Peça / Serviço</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;"><strong>${dados.itemType}</strong></td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Quantidade</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.quantidade || 'Não informada'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Prazo Desejado</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.prazo || 'Não informado'}</td>
              </tr>
            </table>

            ${dynamicRows ? `
            <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 13px; border-radius: 4px; margin-top: 20px;">
              3. Especificações Técnicas
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
              ${dynamicRows}
            </table>
            ` : ''}

            ${dados.observacoes ? `
            <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 13px; border-radius: 4px; margin-top: 20px;">
              4. Observações Adicionais
            </h3>
            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 14px; border-radius: 4px; font-size: 13px; white-space: pre-wrap; margin-bottom: 16px;">
              ${dados.observacoes}
            </div>
            ` : ''}

            ${anexo ? `
            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 10px; border-radius: 4px; font-size: 13px; margin-top: 16px;">
              📎 <strong>Arquivo Técnico Anexado:</strong> O arquivo enviado pelo cliente (<code>${anexo.filename}</code>) está anexado nesta mensagem.
            </div>
            ` : `
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; color: #64748b; padding: 10px; border-radius: 4px; font-size: 13px; margin-top: 16px;">
              ℹ️ Nenhum arquivo técnico ou desenho anexado pelo cliente.
            </div>
            `}

            ${dados.folderId ? `
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 10px; border-radius: 4px; font-size: 13px; margin-top: 12px;">
              📁 <strong>Google Drive:</strong> Arquivos salvos na nuvem.
              <a href="https://drive.google.com/drive/folders/${dados.folderId}" target="_blank" style="color: #15803d; font-weight: bold; text-decoration: underline; margin-left: 4px;">
                Abrir pasta no Google Drive ↗
              </a>
            </div>
            ` : ''}
          </div>
        </div>
      `,
      attachments
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 E-mail de notificação de orçamento enviado para a empresa (${emailEmpresa}) referente ao cliente ${dados.nome}`);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail de notificação de orçamento para a empresa:', error);
  }
}

// --- FUNÇÃO PRINCIPAL (API) ---

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 1. Extração de Dados
    const nome = formData.get('nome') as string;
    const empresa = (formData.get('empresa') as string) || 'Particular';
    const email = formData.get('email') as string;
    const telefone = formData.get('telefone') as string;
    const itemType = formData.get('itemType') as string;
    const quantidade = (formData.get('quantidade') as string) || '';
    const prazo = (formData.get('prazo') as string) || '';
    const observacoes = (formData.get('observacoes') as string) || '';
    const origem = (formData.get('origem') as string) || '';
    const arquivo = formData.get('arquivo') as File | null;

    if (!nome || !email || !telefone || !itemType) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios ausentes (Nome, E-mail, Telefone, Item).' },
        { status: 400 }
      );
    }

    // Campos Dinâmicos
    const camposIgnorar = ['nome', 'empresa', 'email', 'telefone', 'itemType', 'observacoes', 'origem', 'arquivo', 'quantidade', 'prazo'];
    const dynamicFields: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (!camposIgnorar.includes(key) && value && value.toString().trim() !== '') {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
        dynamicFields[label] = value as string;
      }
    }

    console.log(`🚀 Processando orçamento: ${nome} - ${itemType}`);

    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    let anexoOrcamento: AnexoOrcamento | undefined = undefined;
    let fileBuffer: Buffer | null = null;

    if (arquivo && arquivo.size > 0) {
      const arrayBuffer = await arquivo.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
      anexoOrcamento = {
        filename: arquivo.name,
        content: fileBuffer,
        contentType: arquivo.type || 'application/octet-stream'
      };
    }

    let folderId: string | undefined = undefined;

    // Google Drive Upload (se configurado)
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_REFRESH_TOKEN) {
      try {
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );

        oauth2Client.setCredentials({
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });

        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        const folderName = `[${itemType.toUpperCase()}] ${nome} - ${empresa}`;
        const folderMetadata = {
          name: `${folderName} - ${timestamp}`,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID!]
        };

        const folder = await drive.files.create({
          requestBody: folderMetadata,
          fields: 'id'
        });

        folderId = folder.data.id || undefined;

        // Salvar TXT
        const especificacoesTexto = Object.entries(dynamicFields)
          .map(([k, v]) => `• ${k}: ${v}`)
          .join('\n');

        const conteudoTxt = `
SOLICITAÇÃO DE ORÇAMENTO
Data: ${timestamp}
===================================
Nome:       ${nome}
Empresa:    ${empresa}
Email:      ${email}
Telefone:   ${telefone}
Origem:     ${origem || 'Não informado'}
Quantidade: ${quantidade || 'Não informado'}
Prazo:      ${prazo || 'Não informado'}

ESPECIFICAÇÕES (${itemType.toUpperCase()})
-----------------------
${especificacoesTexto}

OBSERVAÇÕES:
${observacoes}
        `.trim();

        const textStream = new Readable();
        textStream.push(conteudoTxt);
        textStream.push(null);

        await drive.files.create({
          requestBody: {
            name: 'DETALHES_DO_PEDIDO.txt',
            parents: [folderId!]
          },
          media: {
            mimeType: 'text/plain',
            body: textStream
          }
        });

        // Upload Anexo no Drive
        if (arquivo && fileBuffer && folderId) {
          const fileStream = bufferToStream(fileBuffer);
          await drive.files.create({
            requestBody: {
              name: arquivo.name,
              parents: [folderId]
            },
            media: {
              mimeType: arquivo.type || 'application/octet-stream',
              body: fileStream
            }
          });
        }
      } catch (driveErr) {
        console.error('⚠️ Erro ao salvar dados no Google Drive:', driveErr);
      }
    } else {
      console.warn('⚠️ Credenciais do Google Drive não configuradas no .env. Prosseguindo sem Drive.');
    }

    // 6. Enviar Confirmação ao Cliente (Sem link do Drive)
    if (email) {
      await enviarConfirmacaoCliente({
        nome,
        email,
        itemType
      });
    }

    // 7. Enviar Notificação com todos os dados do orçamento para a empresa / proprietário
    await enviarNotificacaoEmpresaOrcamento({
      nome,
      empresa,
      email,
      telefone,
      itemType,
      quantidade,
      prazo,
      observacoes,
      origem,
      dynamicFields,
      timestamp,
      folderId
    }, anexoOrcamento);

    return NextResponse.json({
      success: true,
      message: 'Orçamento enviado com sucesso!',
      folderId
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro interno';
    console.error('❌ Erro crítico:', error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}