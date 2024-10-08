export interface BissectionMethodResponse {
  raiz: number;
  valorFuncao: number;
  iteracoes: number;
  convergiu: boolean;
  erro: number;
  motivoParada: string;
  passos: BissectionMethodStep[];
  metodo: string;
}
export interface FalsePositionMethodResponse {
  raiz: number;
  valorFuncao: number;
  iteracoes: number;
  convergiu: boolean;
  erro: number;
  motivoParada: string;
  passos: FalsePositionMethodStep[];
  metodo: string;
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
  metodo: string;
}
export interface SecantMethodResponse {
  raiz: number;
  valorFuncao: number;
  iteracoes: number;
  convergiu: boolean;
  erro: number;
  motivoParada: string;
  passos: SecanteMethodStep[];
  metodo: string;
}
export interface BissectionMethodStep {
  iteracao: number;
  intervaloAtual: {
    a: number;
    b: number;
  };
  xAprox: number;
  fxAprox: number;
  erro: number;
  descricao: string;
}
export interface FalsePositionMethodStep {
  iteracao: number;
  intervaloAtual: {
    a: number;
    b: number;
  };
  xAprox: number;
  fxAprox: number;
  erro: number;
  descricao: string;
}
export interface NewtonRaphsonStep {
  derivada: string;
  descricao: string;
  fxAprox: number;
  fxAtual: number;
  iteracao: number;
  xAprox: number;
  xAtual: number;
}
export interface SecanteMethodStep {
  erro: number;
  fa: number;
  fb: number;
  xAprox: number;
  iteracao: number;
  a: number;
  b: number;
  fxAprox: number;
}
export interface ErrorResponse {
  error: string;
}
