export interface BissectionMethodResponse {
  raiz: number;
  valorFuncao: number;
  iteracoes: number;
  convergiu: boolean;
  erro: number;
  motivoParada: string;
  passos: [
    {
      iteracao: number;
      intervaloAtual: {
        a: number;
        b: number;
      };
      pontoMedio: number;
      valorFuncao: number;
      erro: number;
      descricao: string;
    }
  ];
}
