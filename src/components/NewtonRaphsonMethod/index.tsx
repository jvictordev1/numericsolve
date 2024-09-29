import { NewtonRaphsonStep } from "@/common";
import { BlockMath } from "react-katex";

export default function NewtonRaphsonMethod({
  derivada,
  erro,
  iteracao,
  valorFuncao,
  xAtual,
  xNovo,
}: NewtonRaphsonStep) {
  const formulaPontoMedio = `
    p = \\ ${xAtual.toFixed(4)} - \\frac{f(${xAtual.toFixed(
    4
  )})}{f'(${xAtual.toFixed(4)})} = ${xNovo.toFixed(4)}
  `;
  const formulaValorFuncao = `
  f(p) = f(${xNovo.toFixed(4)}) = ${valorFuncao.toFixed(4)}
`;

  const formulaErro = `
  \\text{Erro} = \\ |f(${xNovo.toFixed(4)})| = ${erro.toFixed(4)}
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
