import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';
import nodemailer from 'nodemailer';
import path from 'path';

function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

// Encontra ou cria a pasta "Inscrições para Vagas" dentro do Google Drive
async function getVagasFolderId(drive: any, parentFolderId: string): Promise<string> {
  if (process.env.GOOGLE_DRIVE_VAGAS_FOLDER_ID) {
    return process.env.GOOGLE_DRIVE_VAGAS_FOLDER_ID;
  }

  try {
    const searchRes = await drive.files.list({
      q: `'${parentFolderId}' in parents and name = 'Inscrições para Vagas' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });

    if (searchRes.data.files && searchRes.data.files.length > 0) {
      return searchRes.data.files[0].id;
    }

    const newFolder = await drive.files.create({
      requestBody: {
        name: 'Inscrições para Vagas',
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId]
      },
      fields: 'id'
    });

    return newFolder.data.id;
  } catch (err) {
    console.error('⚠️ Erro ao localizar/criar pasta de Vagas no Drive:', err);
    return parentFolderId;
  }
}

export interface DadosCandidatoNotificacao {
  vaga: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidadeEstado: string;
  dataNascimento: string;
  sexo: string;
  habilitacao: string;
  escolaridade: string;
  formacaoSuperior: string;
  formacaoTecnica: string;
  resumoCursos: string;
  experienciaNaVaga: string;
  resumoExperiencia: string;
  pretensaoSalarial: string;
  timestamp: string;
}

export interface AnexoCurriculo {
  filename: string;
  content: Buffer;
  contentType: string;
}

// Envio de email de confirmação para o candidato
export async function enviarConfirmacaoCandidato(dados: { nome: string; email: string; vaga: string }) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Credenciais de e-mail não configuradas. Pulando envio de confirmação.');
      return;
    }

    const emailEmpresa = process.env.EMAIL_NOTIFICACAO_VAGAS || process.env.EMAIL_USER;

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
      subject: `Inscrição Recebida - Vaga: ${dados.vaga}`,
      text: `Olá ${dados.nome},\n\nRecebemos sua inscrição para a vaga de ${dados.vaga}.\nSeu currículo e informações foram cadastrados com sucesso em nosso banco de talentos.\n\nAtenciosamente,\nEquipe Nardelli Usinagem`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:logonardelli" alt="Nardelli Usinagem" style="max-width: 180px; height: auto;" />
          </div>
          <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #ea580c; margin-top: 0;">Inscrição Recebida!</h2>
            <p>Olá <strong>${dados.nome}</strong>,</p>
            <p>Sua candidatura para a vaga de <strong>${dados.vaga}</strong> foi registrada com sucesso.</p>
            <p>Seus dados pessoais e currículo foram encaminhados para a nossa equipe de Recursos Humanos.</p>
            <p>Caso o seu perfil atenda aos requisitos da vaga, nossa equipe entrará em contato para agendar uma entrevista.</p>
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
    console.log(`📧 E-mail de confirmação enviado para o candidato: ${dados.email}`);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail para o candidato:', error);
  }
}

// Envio de email de notificação com informações do candidato para a empresa
export async function enviarNotificacaoEmpresa(
  dados: DadosCandidatoNotificacao,
  anexo?: AnexoCurriculo
) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Credenciais de e-mail não configuradas. Pulando envio de notificação para a empresa.');
      return;
    }

    const emailEmpresa = process.env.EMAIL_NOTIFICACAO_VAGAS || process.env.EMAIL_USER;

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

    const attachments: any[] = [
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

    const mailOptions = {
      from: `"Nardelli Usinagem - Vagas" <${process.env.EMAIL_ALIAS || process.env.EMAIL_USER}>`,
      to: emailEmpresa,
      replyTo: dados.email,
      subject: `[Nova Candidatura] ${dados.vaga} - ${dados.nome}`,
      text: `NOVA CANDIDATURA RECEBIDA!\n\nVaga: ${dados.vaga}\nNome: ${dados.nome}\nE-mail: ${dados.email}\nTelefone: ${dados.telefone}\nCidade/Estado: ${dados.cidadeEstado}\nEscolaridade: ${dados.escolaridade}\nExperiência: ${dados.experienciaNaVaga}\nPretensão Salarial: ${dados.pretensaoSalarial}\nData/Hora: ${dados.timestamp}\n\nConfira todos os detalhes no HTML do e-mail e no currículo anexado.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 650px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:logonardelli" alt="Nardelli Usinagem" style="max-width: 180px; height: auto;" />
          </div>
          
          <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            <div style="background-color: #ea580c; color: #ffffff; text-align: center; padding: 8px 12px; font-weight: bold; border-radius: 4px; margin-bottom: 16px; font-size: 14px;">
              🚨 NOVA CANDIDATURA RECEBIDA
            </div>

            <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Vaga Pretendida: <span style="color: #ea580c;">${dados.vaga}</span></h2>
            <p style="color: #64748b; font-size: 13px; margin-top: -10px; margin-bottom: 20px;">Data/Hora da inscrição: ${dados.timestamp}</p>

            <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 13px; border-radius: 4px; margin-top: 20px;">1. Dados Pessoais e de Contato</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; width: 30%;">Nome Completo</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;"><strong>${dados.nome}</strong></td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">E-mail</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;"><a href="mailto:${dados.email}" style="color: #ea580c; text-decoration: none;">${dados.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Telefone / WhatsApp</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;"><a href="https://wa.me/${dados.telefone.replace(/\D/g, '')}" target="_blank" style="color: #16a34a; font-weight: bold; text-decoration: none;">${dados.telefone} 💬</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Endereço Residencial</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.endereco || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Cidade / Estado</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.cidadeEstado || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Data de Nascimento</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.dataNascimento || 'Não informada'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Sexo</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.sexo || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Possui Habilitação (CNH)</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.habilitacao || 'Não possui'}</td>
              </tr>
            </table>

            <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 13px; border-radius: 4px; margin-top: 20px;">2. Formação Acadêmica e Qualificações</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; width: 30%;">Escolaridade</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;"><strong>${dados.escolaridade}</strong></td>
              </tr>
              ${dados.formacaoTecnica ? `
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Ensino Técnico</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.formacaoTecnica}</td>
              </tr>` : ''}
              ${dados.formacaoSuperior ? `
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Ensino Superior / Pós</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.formacaoSuperior}</td>
              </tr>` : ''}
            </table>

            ${dados.resumoCursos ? `
            <p style="font-weight: bold; margin-bottom: 4px; font-size: 13px;">Resumo de Cursos Extracurriculares:</p>
            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 8px 12px; margin-bottom: 16px; font-size: 13px; white-space: pre-wrap;">${dados.resumoCursos}</div>
            ` : ''}

            <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 13px; border-radius: 4px; margin-top: 20px;">3. Experiência Profissional e Pretensão</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold; width: 30%;">Experiência na Vaga</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${dados.experienciaNaVaga || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9; font-weight: bold;">Pretensão Salarial</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1;"><strong>${dados.pretensaoSalarial || 'Não informada'}</strong></td>
              </tr>
            </table>

            ${dados.resumoExperiencia ? `
            <p style="font-weight: bold; margin-bottom: 4px; font-size: 13px;">Resumo das Experiências Profissionais:</p>
            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 8px 12px; margin-bottom: 16px; font-size: 13px; white-space: pre-wrap;">${dados.resumoExperiencia}</div>
            ` : ''}

            ${anexo ? `
            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 10px; border-radius: 4px; font-size: 13px; margin-top: 16px;">
              📎 <strong>Currículo Anexado:</strong> O arquivo enviado pelo candidato (<code>${anexo.filename}</code>) está em anexo nesta mensagem.
            </div>
            ` : `
            <div style="background-color: #fff7ed; border: 1px solid #ffedd5; color: #c2410c; padding: 10px; border-radius: 4px; font-size: 13px; margin-top: 16px;">
              ⚠️ O candidato não anexou um arquivo de currículo.
            </div>
            `}
          </div>
        </div>
      `,
      attachments
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 E-mail de notificação enviado para a empresa (${emailEmpresa}) referente ao candidato ${dados.nome}`);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail de notificação para a empresa:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extração dos dados baseados na planilha Excel
    const aceitoTermos = formData.get('aceitoTermos') as string || 'Sim';
    const vaga = formData.get('vaga') as string || 'Não informada';
    const nome = formData.get('nome') as string || '';
    const email = formData.get('email') as string || '';
    const telefone = formData.get('telefone') as string || '';
    const endereco = formData.get('endereco') as string || '';
    const cidadeEstado = formData.get('cidadeEstado') as string || '';
    const dataNascimento = formData.get('dataNascimento') as string || '';
    const sexo = formData.get('sexo') as string || '';
    const habilitacao = formData.get('habilitacao') as string || '';
    const escolaridade = formData.get('escolaridade') as string || '';
    const formacaoSuperior = formData.get('formacaoSuperior') as string || '';
    const formacaoTecnica = formData.get('formacaoTecnica') as string || '';
    const resumoCursos = formData.get('resumoCursos') as string || '';
    const experienciaNaVaga = formData.get('experienciaNaVaga') as string || '';
    const resumoExperiencia = formData.get('resumoExperiencia') as string || '';
    const pretensaoSalarial = formData.get('pretensaoSalarial') as string || '';
    const arquivo = formData.get('arquivo') as File | null;

    if (!nome || !email || !telefone || !vaga) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios ausentes (Nome, E-mail, Telefone, Vaga).' },
        { status: 400 }
      );
    }

    console.log(`🚀 Processando inscrição de vaga: ${nome} - ${vaga}`);

    // Configuração de credenciais do Google Drive
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
      throw new Error('Credenciais do Google Drive não configuradas no .env');
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    // Obter Pasta de Vagas ("Inscrições para Vagas")
    const parentId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID!;
    const vagasFolderId = await getVagasFolderId(drive, parentId);

    // Criar pasta individual para este candidato
    const sanitizeName = (str: string) => str.replace(/[\/\\:*?"<>|]/g, '');
    const folderName = `[${sanitizeName(vaga).toUpperCase()}] ${sanitizeName(nome)} - ${timestamp}`;

    const candidateFolder = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [vagasFolderId]
      },
      fields: 'id'
    });

    const candidateFolderId = candidateFolder.data.id;

    // Gerar conteúdo em HTML para ser CONVERTIDO automaticamente pelo Google Drive em um Google Document (Doc) oficial
    const conteudoHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5;">
  
  <h1 style="color: #ea580c; text-align: center; margin-bottom: 4px; font-size: 20pt;">NARDELLI USINAGEM</h1>
  <p style="color: #64748b; text-align: center; margin-top: 0; font-size: 12pt; font-weight: bold;">FICHA DE INSCRIÇÃO PARA VAGAS DE TRABALHO</p>
  <hr style="border: 0; border-top: 2px solid #ea580c; margin-bottom: 20px;" />

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #fed7aa; background-color: #fff7ed;">
    <tr>
      <td style="padding: 10px; border: 1px solid #fed7aa; font-weight: bold; width: 20%;">VAGA PRETENDIDA:</td>
      <td style="padding: 10px; border: 1px solid #fed7aa; color: #c2410c; font-size: 13pt; font-weight: bold;">${vaga}</td>
      <td style="padding: 10px; border: 1px solid #fed7aa; font-weight: bold; width: 20%;">DATA / HORA:</td>
      <td style="padding: 10px; border: 1px solid #fed7aa;">${timestamp}</td>
    </tr>
  </table>

  <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 11pt; margin-top: 20px; margin-bottom: 10px;">1. DADOS PESSOAIS E DE CONTATO</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold; width: 25%;">Nome Completo</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;" colspan="3"><strong>${nome}</strong></td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">E-mail</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">${email}</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Telefone / WhatsApp</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>${telefone}</strong></td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Endereço Residencial</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;" colspan="3">${endereco}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Cidade / Estado</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">${cidadeEstado}</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Data de Nascimento</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">${dataNascimento}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Sexo</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">${sexo || 'Não informado'}</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Possui Habilitação (CNH)</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">${habilitacao || 'Não possui'}</td>
    </tr>
  </table>

  <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 11pt; margin-top: 20px; margin-bottom: 10px;">2. FORMAÇÃO ACADÊMICA E QUALIFICAÇÕES</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold; width: 25%;">Escolaridade</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>${escolaridade}</strong></td>
    </tr>
    ${formacaoTecnica ? `
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Formação Nível Técnico</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">${formacaoTecnica}</td>
    </tr>` : ''}
    ${formacaoSuperior ? `
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Formação Ensino Superior / Pós</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">${formacaoSuperior}</td>
    </tr>` : ''}
  </table>

  ${resumoCursos ? `
  <p style="font-weight: bold; margin-bottom: 4px;">Resumo de Cursos Extracurriculares e Qualificações:</p>
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 20px; font-size: 10.5pt; white-space: pre-wrap;">${resumoCursos}</div>
  ` : ''}

  <h3 style="background-color: #0f172a; color: #ffffff; padding: 6px 12px; font-size: 11pt; margin-top: 20px; margin-bottom: 10px;">3. EXPERIÊNCIA PROFISSIONAL E PRETENSÃO</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold; width: 25%;">Experiência na Vaga</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>${experienciaNaVaga || 'Não informado'}</strong></td>
      <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold; width: 25%;">Pretensão Salarial</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>${pretensaoSalarial || 'Não informada'}</strong></td>
    </tr>
  </table>

  ${resumoExperiencia ? `
  <p style="font-weight: bold; margin-bottom: 4px;">Resumo das Experiências Profissionais:</p>
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 20px; font-size: 10.5pt; white-space: pre-wrap;">${resumoExperiencia}</div>
  ` : ''}

  <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 10px; font-weight: bold; font-size: 10pt; margin-top: 25px;">
    ✓ Consentimento LGPD: O candidato autorizou ativamente o uso e tratamento dos seus dados pessoais e profissionais para cadastro no banco de talentos da Nardelli Usinagem em ${timestamp}.
  </div>

</body>
</html>
`.trim();

    const htmlStream = new Readable();
    htmlStream.push(conteudoHtml);
    htmlStream.push(null);

    // Salvar como documento nativo do Google Docs (application/vnd.google-apps.document)
    await drive.files.create({
      requestBody: {
        name: `FICHA_DE_INSCRICAO_${sanitizeName(nome).replace(/\s+/g, '_')}`,
        mimeType: 'application/vnd.google-apps.document',
        parents: [candidateFolderId!]
      },
      media: {
        mimeType: 'text/html',
        body: htmlStream
      }
    });

    // Anexar arquivo de Currículo se for enviado
    let anexoCurriculo: AnexoCurriculo | undefined = undefined;

    if (arquivo && arquivo.size > 0) {
      const arrayBuffer = await arquivo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileStream = bufferToStream(buffer);

      const fileExt = path.extname(arquivo.name) || '.pdf';
      const fileName = `CURRICULO_${sanitizeName(nome).replace(/\s+/g, '_')}${fileExt}`;

      anexoCurriculo = {
        filename: fileName,
        content: buffer,
        contentType: arquivo.type || 'application/pdf'
      };

      await drive.files.create({
        requestBody: {
          name: fileName,
          parents: [candidateFolderId!]
        },
        media: {
          mimeType: arquivo.type || 'application/pdf',
          body: fileStream
        }
      });
    }

    // Enviar email de auto-confirmação para o candidato
    if (email) {
      await enviarConfirmacaoCandidato({ nome, email, vaga });
    }

    // Enviar email de notificação com todas as informações para a empresa
    await enviarNotificacaoEmpresa({
      vaga,
      nome,
      email,
      telefone,
      endereco,
      cidadeEstado,
      dataNascimento,
      sexo,
      habilitacao,
      escolaridade,
      formacaoSuperior,
      formacaoTecnica,
      resumoCursos,
      experienciaNaVaga,
      resumoExperiencia,
      pretensaoSalarial,
      timestamp
    }, anexoCurriculo);

    return NextResponse.json({
      success: true,
      message: 'Inscrição enviada com sucesso! Seus dados foram salvos.',
      folderId: candidateFolderId
    });

  } catch (error: any) {
    console.error('❌ Erro crítico ao processar inscrição de vaga:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro interno no servidor.' },
      { status: 500 }
    );
  }
}
