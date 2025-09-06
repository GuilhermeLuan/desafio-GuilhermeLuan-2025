import { AbrigoAnimais } from "./abrigo-animais.js";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  // Teste da Regra 4
  test('Regra 4: Animal fica no abrigo se ambas pessoas podem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
  });

  // Teste da Regra 3
  test('Regra 3: Gatos não dividem brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER,RATO', 'CAIXA,NOVELO', 'Mimi,Zero');
    expect(resultado.lista[0]).toBe('Mimi - pessoa 1');
    expect(resultado.lista[1]).toBe('Zero - abrigo');
  });

  // Teste da Regra 5
  test('Regra 5: Máximo 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,LASER,SKATE', 'NOVELO', 'Rex,Bola,Bebe,Loco');
    const pessoa1Animals = resultado.lista.filter(item => item.includes('pessoa 1'));
    expect(pessoa1Animals.length).toBeLessThanOrEqual(3);
  });

  // Teste da Regra 6
  test('Regra 6: Loco aceita brinquedos fora de ordem se tiver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,RATO,SKATE', 'NOVELO', 'Rex,Loco');
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  // Teste de ordem dos brinquedos (Regra 1 e 2)
  test('Regra 1 e 2: Ordem dos brinquedos com intercalação', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,OUTRO,RATO', 'LASER,RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - pessoa 2');
  });

  // Teste adicional: Caso complexo com todas as regras
  test('Caso complexo: Aplicação de múltiplas regras', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,BOLA,RATO,BOLA', 
      'CAIXA,NOVELO,SKATE,RATO',
      'Rex,Mimi,Bola,Loco');
    
    expect(resultado.lista).toContain('Rex - pessoa 1');
    
    expect(resultado.lista).toContain('Mimi - abrigo');
    
    expect(resultado.lista).toContain('Bola - pessoa 2');
    
    expect(resultado.lista).toContain('Loco - pessoa 2');
  });

  // Teste: Loco sem companhia deve respeitar ordem
  test('Loco sem companhia deve respeitar ordem dos brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE', 'SKATE,RATO', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - pessoa 2');
  });
});
