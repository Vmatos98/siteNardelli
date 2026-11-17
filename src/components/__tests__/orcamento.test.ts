import { describe, it, expect, vi, beforeEach } from 'vitest';
import nodemailer from 'nodemailer';
import {
  enviarConfirmacaoCliente,
  enviarNotificacaoEmpresaOrcamento,
  DadosOrcamentoNotificacao,
  AnexoOrcamento
} from '../../app/api/orcamento/route';

vi.mock('nodemailer');

describe('Notificações de Email de Orçamento', () => {
  const mockSendMail = vi.fn().mockResolvedValue(true);

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.EMAIL_USER = 'compras@nardelliusinagem.com';
    process.env.EMAIL_PASS = 'secret_pass';
    process.env.EMAIL_NOTIFICACAO_VAGAS = 'financeiro@nardelliusinagem.com';
    delete process.env.EMAIL_NOTIFICACAO_ORCAMENTO;

    (nodemailer.createTransport as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      sendMail: mockSendMail,
    });
  });

  it('deve enviar e-mail de confirmação para o cliente com replyTo direcionado para o e-mail do proprietário', async () => {
    await enviarConfirmacaoCliente({
      nome: 'Carlos Eduardo',
      email: 'carlos@industria.com.br',
      itemType: 'Eixo'
    });

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.to).toBe('carlos@industria.com.br');
    expect(mailOptions.replyTo).toBe('financeiro@nardelliusinagem.com');
    expect(mailOptions.subject).toContain('Eixo');
    expect(mailOptions.html).toContain('Carlos Eduardo');
  });

  it('deve enviar e-mail de notificação de orçamento para a empresa usando o mesmo e-mail do proprietário (EMAIL_NOTIFICACAO_VAGAS)', async () => {
    const dadosOrcamento: DadosOrcamentoNotificacao = {
      nome: 'Roberto Mendes',
      empresa: 'Metalúrgica Mendes',
      email: 'roberto@mendes.com.br',
      telefone: '(79) 99876-5432',
      itemType: 'Engrenagem',
      quantidade: '10 peças',
      prazo: '15 dias',
      origem: 'Google',
      observacoes: 'Peça temperada e retificada com alta precisão.',
      dynamicFields: {
        'Diâmetro Externo': '120 mm',
        'Módulo': '2.5',
        'Número de Dentes': '36',
        'Material': 'Aço SAE 8620'
      },
      timestamp: '16/11/2026 22:30:00',
      folderId: 'drive_folder_12345'
    };

    const dummyBuffer = Buffer.from('DESENHO_TECNICO_DUMMY');
    const anexo: AnexoOrcamento = {
      filename: 'DESENHO_ENGRENAGEM.dwg',
      content: dummyBuffer,
      contentType: 'application/octet-stream'
    };

    await enviarNotificacaoEmpresaOrcamento(dadosOrcamento, anexo);

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const mailOptions = mockSendMail.mock.calls[0][0];
    // Deve enviar para o mesmo e-mail da empresa/vagas
    expect(mailOptions.to).toBe('financeiro@nardelliusinagem.com');
    // Deve permitir responder diretamente ao cliente
    expect(mailOptions.replyTo).toBe('roberto@mendes.com.br');
    expect(mailOptions.subject).toBe('[Novo Orçamento] Engrenagem - Roberto Mendes (Metalúrgica Mendes)');
    expect(mailOptions.text).toContain('Metalúrgica Mendes');
    expect(mailOptions.text).toContain('Aço SAE 8620');
    expect(mailOptions.html).toContain('Roberto Mendes');
    expect(mailOptions.html).toContain('Metalúrgica Mendes');
    expect(mailOptions.html).toContain('Aço SAE 8620');
    expect(mailOptions.html).toContain('https://wa.me/79998765432');
    expect(mailOptions.html).toContain('https://drive.google.com/drive/folders/drive_folder_12345');
    // Anexos: logo + arquivo enviado
    expect(mailOptions.attachments.length).toBe(2);
    expect(mailOptions.attachments[0].cid).toBe('logonardelli');
    expect(mailOptions.attachments[1].filename).toBe('DESENHO_ENGRENAGEM.dwg');
  });

  it('deve priorizar EMAIL_NOTIFICACAO_ORCAMENTO caso explicitamente configurado', async () => {
    process.env.EMAIL_NOTIFICACAO_ORCAMENTO = 'orcamentos@nardelliusinagem.com';

    await enviarNotificacaoEmpresaOrcamento({
      nome: 'Ana Lima',
      empresa: 'Particular',
      email: 'ana@gmail.com',
      telefone: '(79) 99111-2222',
      itemType: 'Flange',
      timestamp: '16/11/2026 22:35:00'
    });

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.to).toBe('orcamentos@nardelliusinagem.com');
    expect(mailOptions.replyTo).toBe('ana@gmail.com');
  });
});
