import { FalsePositionMethodStep } from "@/common";
import { BlockMath } from "react-katex";

export default function FalsePositionMethod({
  intervaloAtual,
  pontoFalsaPosicao,
  valorFuncao,
  erro,
  iteracao,
}: FalsePositionMethodStep) {
  const formulaPontoMedio = `
    p = \\frac{${intervaloAtual.a.toFixed(4)}*f(${intervaloAtual.b.toFixed(
    4
  )}) + ${intervaloAtual.b.toFixed(4)}*f(${intervaloAtual.a.toFixed(
    4
  )})}{f(${intervaloAtual.b.toFixed(4)})*f(${intervaloAtual.a.toFixed(
    4
  )})} = ${pontoFalsaPosicao.toFixed(4)}
`;
  const formulaValorFuncao = `
  f(p) = f(${pontoFalsaPosicao.toFixed(4)}) = ${valorFuncao.toFixed(4)}
`;

  const formulaErro = `
  \\text{Erro} = \\ |f(${pontoFalsaPosicao.toFixed(4)})| = ${erro.toFixed(4)}
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
