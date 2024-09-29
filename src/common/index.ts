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
  iteracao: number;
  x0: number;
  x1: number;
  xNovo: number;
  valorFuncao: number;
  erro: number;
}
export interface ErrorResponse {
  error: string;
}
