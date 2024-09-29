import { SecanteMethodStep } from "@/common";
import { BlockMath } from "react-katex";

export default function SecantMethod({
  erro,
  iteracao,
  valorFuncao,
  x0,
  x1,
  xNovo,
}: SecanteMethodStep) {
  const formulaPonto = `
    p = \\frac{[${x0.toFixed(4)}*f(${x1.toFixed(4)}) - ${x1.toFixed(
    4
  )}*f(${x0.toFixed(4)})]}{f(${x1.toFixed(4)})-f(${x0.toFixed(
    4
  )})} = ${xNovo.toFixed(4)}
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
      <BlockMath>{formulaPonto}</BlockMath>
      <BlockMath>{formulaValorFuncao}</BlockMath>
      <BlockMath>{formulaErro}</BlockMath>
    </div>
  );
}
