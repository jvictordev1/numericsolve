import { BissectionMethodStep } from "@/common";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
export default function BissectionMethod({
  intervaloAtual,
  pontoMedio,
  valorFuncao,
  erro,
  iteracao,
}: BissectionMethodStep) {
  const formulaPontoMedio = `
      p = \\frac{${intervaloAtual.a.toFixed(4)} + ${intervaloAtual.b.toFixed(
    4
  )}}{2} = ${pontoMedio.toFixed(4)}
  `;
  const formulaValorFuncao = `
    f(p) = f(${pontoMedio.toFixed(4)}) = ${valorFuncao.toFixed(4)}
  `;

  const formulaErro = `
    \\text{Erro} = \\ |f(${pontoMedio.toFixed(4)})| = ${erro.toFixed(4)}
  `;

  return (
    <div>
      <h4 className="text-xl font-medium">Iteração {iteracao}</h4>
      <BlockMath>{formulaPontoMedio}</BlockMath>
      <BlockMath>{formulaValorFuncao}</BlockMath>
      <BlockMath>{formulaErro}</BlockMath>
    </div>
  );
}
