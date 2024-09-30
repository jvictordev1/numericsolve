export interface BissectionMethodResponse {
  raiz: number;
  valorFuncao: number;
  iteracoes: number;
  convergiu: boolean;
  erro: number;
  motivoParada: string;
  passos: BissectionMethodStep[];
}
export interface FalsePositionMethodResponse {
  raiz: number;
  valorFuncao: number;
  iteracoes: number;
  convergiu: boolean;
  erro: number;
  motivoParada: string;
  passos: FalsePositionMethodStep[];
}
export interface NewtonRaphsonResponse {
  raiz: number;
  valorFuncao: number;
  iteracoes: number;
  convergiu: boolean;
  erro: number;
  motivoParada: string;
  derivada: string;
  passos: NewtonRaphsonStep[];
}
export interface SecantMethodResponse {
  raiz: number;
  valorFuncao: number;
  iteracoes: number;
  convergiu: boolean;
  erro: number;
  motivoParada: string;
  passos: SecanteMethodStep[];
}
export interface BissectionMethodStep {
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
export interface FalsePositionMethodStep {
  iteracao: number;
  intervaloAtual: {
    a: number;
    b: number;
  };
  pontoFalsaPosicao: number;
  valorFuncao: number;
  erro: number;
  descricao: string;
}
export interface NewtonRaphsonStep {
  iteracao: number;
  xAtual: number;
  valorFuncao: number;
  derivada: string;
  xNovo: number;
  erro: number;
}
export interface SecanteMethodStep {
  erro: number;
  fXCurr: number;
  fXPrev: number;
  iteracao: number;
  xCurr: number;
  xNext: number;
  xPrev: number;
}
export interface ErrorResponse {
  error: string;
}
