import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VAGAS_OPCOES } from '../FormularioVagas';
import nodemailer from 'nodemailer';
import { enviarConfirmacaoCandidato, enviarNotificacaoEmpresa } from '../../app/api/vagas/route';

vi.mock('nodemailer');

describe('Vagas Form Configuration', () => {
  it('deve conter as 13 vagas extraídas da planilha Excel mais a opção geral', () => {
    expect(VAGAS_OPCOES).toContain("Desenhista mecânico");
    expect(VAGAS_OPCOES).toContain("Líder de produção");
    expect(VAGAS_OPCOES).toContain("Orçamentista mecânico");
    expect(VAGAS_OPCOES).toContain("Técnico em PCP");
    expect(VAGAS_OPCOES).toContain("Auxiliar de Produção");
    expect(VAGAS_OPCOES).toContain("Auxiliar administrativo");
    expect(VAGAS_OPCOES).toContain("Auxiliar de Torneiro Mecânico");
    expect(VAGAS_OPCOES).toContain("Torneiro Mecânico");
    expect(VAGAS_OPCOES).toContain("Mecânico de manutenção industrial");
    expect(VAGAS_OPCOES).toContain("Operador de máquina CNC");
    expect(VAGAS_OPCOES).toContain("Gerente Comercial");
    expect(VAGAS_OPCOES).toContain("Fresador máquinas convencionais");
    expect(VAGAS_OPCOES).toContain("Serviços Gerais");
    expect(VAGAS_OPCOES).toContain("Estagiário");
    expect(VAGAS_OPCOES).toContain("Outros");
    expect(VAGAS_OPCOES.length).toBeGreaterThanOrEqual(13);
  });
});

describe('Notificações de Email de Vagas', () => {
  const mockSendMail = vi.fn().mockResolvedValue(true);

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.EMAIL_USER = 'compras@nardelliusinagem.com';
    process.env.EMAIL_PASS = 'secret_pass';
    process.env.EMAIL_NOTIFICACAO_VAGAS = 'rh@nardelliusinagem.com';

    (nodemailer.createTransport as any).mockReturnValue({
      sendMail: mockSendMail,
    });
  });

  it('deve enviar e-mail de confirmação para o candidato com replyTo direcionado para o e-mail da empresa', async () => {
    await enviarConfirmacaoCandidato({
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      vaga: 'Torneiro Mecânico'
    });

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.to).toBe('joao.silva@example.com');
    expect(mailOptions.replyTo).toBe('rh@nardelliusinagem.com');
    expect(mailOptions.subject).toContain('Torneiro Mecânico');
  });

  it('deve enviar e-mail de notificação para a empresa contendo todos os dados do candidato e replyTo para o e-mail do candidato', async () => {
    const dadosCandidato = {
      vaga: 'Torneiro Mecânico',
      nome: 'Maria Santos',
      email: 'maria.santos@example.com',
      telefone: '(79) 99999-8888',
      endereco: 'Rua Principal, 123',
      cidadeEstado: 'Aracaju / SE',
      dataNascimento: '1995-05-20',
      sexo: 'Feminino',
      habilitacao: 'B',
      escolaridade: 'Ensino Médio Completo',
      formacaoSuperior: 'Engenharia Mecânica',
      formacaoTecnica: 'Técnico em Usinagem',
      resumoCursos: 'Desenho Técnico, Operação CNC',
      experienciaNaVaga: 'Sim, 3 anos',
      resumoExperiencia: 'Atuei como torneira mecânica por 3 anos em indústria metalúrgica.',
      pretensaoSalarial: 'R$ 3.500,00',
      timestamp: '14/08/2026 10:00:00'
    };

    const dummyBuffer = Buffer.from('PDF Content Dummy');
    const anexo = {
      filename: 'CURRICULO_Maria_Santos.pdf',
      content: dummyBuffer,
      contentType: 'application/pdf'
    };

    await enviarNotificacaoEmpresa(dadosCandidato, anexo);

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.to).toBe('rh@nardelliusinagem.com');
    expect(mailOptions.replyTo).toBe('maria.santos@example.com');
    expect(mailOptions.subject).toBe('[Nova Candidatura] Torneiro Mecânico - Maria Santos');
    expect(mailOptions.html).toContain('Maria Santos');
    expect(mailOptions.html).toContain('Engenharia Mecânica');
    expect(mailOptions.html).toContain('R$ 3.500,00');
    expect(mailOptions.attachments.length).toBe(2);
    expect(mailOptions.attachments[1].filename).toBe('CURRICULO_Maria_Santos.pdf');
  });
});

