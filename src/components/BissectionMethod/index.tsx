import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
interface BissectionMethodProps {
  intervaloAtual: { a: number; b: number };
  pontoMedio: number;
  valorFuncao: number;
  erro: number;
  iteracao: number;
}
export default function BissectionMethod({
  intervaloAtual,
  pontoMedio,
  valorFuncao,
  erro,
  iteracao,
}: BissectionMethodProps) {
  const formulaPontoMedio = `
      p = \\frac{${intervaloAtual.a} + ${intervaloAtual.b}}{2} = ${pontoMedio}
  `;
  const formulaValorFuncao = `
    f(p) = f(${pontoMedio}) = ${valorFuncao}
  `;

  const formulaErro = `
    \\text{Erro} = \\frac{|b - a|}{2} = \\frac{|${intervaloAtual.b} - ${intervaloAtual.a}|}{2} = ${erro}
  `;

  return (
    <div>
      <h4>Iteração {iteracao}</h4>
      <BlockMath>{formulaPontoMedio}</BlockMath>
      <BlockMath>{formulaValorFuncao}</BlockMath>
      <BlockMath>{formulaErro}</BlockMath>
    </div>
  );
}
