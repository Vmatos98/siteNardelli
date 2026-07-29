import { describe, it, expect } from 'vitest';
import { VAGAS_OPCOES } from '../FormularioVagas';

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
    expect(VAGAS_OPCOES.length).toBeGreaterThanOrEqual(13);
  });
});
