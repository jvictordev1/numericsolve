import {
  BissectionMethodStep,
  FalsePositionMethodStep,
  NewtonRaphsonStep,
  SecanteMethodStep,
} from "@/common";
import MethodResponse from "../MethodResponse";

interface ResultHandlerProps {
  method: string;
  steps:
    | BissectionMethodStep[]
    | FalsePositionMethodStep[]
    | NewtonRaphsonStep[]
    | SecanteMethodStep[];
}
export default function ResultHandler({ method, steps }: ResultHandlerProps) {
  function renderSelectedMethodCard(
    method: string,
    step:
      | BissectionMethodStep
      | FalsePositionMethodStep
      | NewtonRaphsonStep
      | SecanteMethodStep,
    key: number
  ) {
    switch (method) {
      case "bisseccao":
        return (
          <MethodResponse
            key={key}
            iteracao={step.iteracao}
            formulaPonto={`
          p = \\frac{${(step as BissectionMethodStep).intervaloAtual.a.toFixed(
            4
          )} + ${(step as BissectionMethodStep).intervaloAtual.b.toFixed(
              4
            )}}{2} = ${(step as BissectionMethodStep).pontoMedio.toFixed(4)}
      `}
            formulaValorFuncao={`
      f(p) = f(${(step as BissectionMethodStep).pontoMedio.toFixed(4)}) = ${(
              step as BissectionMethodStep
            ).valorFuncao.toFixed(4)}
    `}
            formulaErro={`
    \\text{Erro} = \\ |f(${(step as BissectionMethodStep).pontoMedio.toFixed(
      4
    )})| = ${(step as BissectionMethodStep).erro.toFixed(6)}
  `}
          />
        );
      case "fp":
        return (
          <MethodResponse
            key={key}
            formulaPonto={`
    p = \\frac{${(step as FalsePositionMethodStep).intervaloAtual.a.toFixed(
      4
    )}*f(${(step as FalsePositionMethodStep).intervaloAtual.b.toFixed(4)}) + ${(
              step as FalsePositionMethodStep
            ).intervaloAtual.b.toFixed(4)}*f(${(
              step as FalsePositionMethodStep
            ).intervaloAtual.a.toFixed(4)})}{f(${(
              step as FalsePositionMethodStep
            ).intervaloAtual.b.toFixed(4)})*f(${(
              step as FalsePositionMethodStep
            ).intervaloAtual.a.toFixed(4)})} = ${(
              step as FalsePositionMethodStep
            ).pontoFalsaPosicao.toFixed(4)}
`}
            formulaValorFuncao={`
f(p) = f(${(step as FalsePositionMethodStep).pontoFalsaPosicao.toFixed(
              4
            )}) = ${(step as FalsePositionMethodStep).valorFuncao.toFixed(4)}
`}
            formulaErro={`
\\text{Erro} = \\ |f(${(
              step as FalsePositionMethodStep
            ).pontoFalsaPosicao.toFixed(4)})| = ${(
              step as FalsePositionMethodStep
            ).erro.toFixed(6)}
`}
            iteracao={step.iteracao}
          />
        );
      case "newtonRaphson":
        return (
          <MethodResponse
            key={key}
            formulaPonto={`
          p = \\ ${(step as NewtonRaphsonStep).xAtual.toFixed(4)} - \\frac{f(${(
              step as NewtonRaphsonStep
            ).xAtual.toFixed(4)})}{f'(${(
              step as NewtonRaphsonStep
            ).xAtual.toFixed(4)})} = ${(
              step as NewtonRaphsonStep
            ).xNovo.toFixed(4)}
        `}
            formulaValorFuncao={`
  f(p) = f(${(step as NewtonRaphsonStep).xNovo.toFixed(4)}) = ${(
              step as NewtonRaphsonStep
            ).valorFuncao.toFixed(4)}
`}
            formulaErro={`
  \\text{Erro} = \\ |f(${(step as NewtonRaphsonStep).xNovo.toFixed(4)})| = ${(
              step as NewtonRaphsonStep
            ).erro.toFixed(6)}
`}
            iteracao={step.iteracao}
          />
        );
      case "secante":
        return (
          <MethodResponse
            key={key}
            formulaPonto={`
        p = \\frac{[${(step as SecanteMethodStep).xPrev.toFixed(4)}*f(${(
              step as SecanteMethodStep
            ).xCurr.toFixed(4)}) - ${(step as SecanteMethodStep).xCurr.toFixed(
              4
            )}*f(${(step as SecanteMethodStep).xPrev.toFixed(4)})]}{f(${(
              step as SecanteMethodStep
            ).xCurr.toFixed(4)})-f(${(step as SecanteMethodStep).xPrev.toFixed(
              4
            )})} = ${(step as SecanteMethodStep).xNext.toFixed(4)}
    `}
            formulaValorFuncao={`
  f(p) = f(${(step as SecanteMethodStep).xNext.toFixed(4)}) = ${(
              step as SecanteMethodStep
            ).fXCurr.toFixed(4)}
`}
            formulaErro={`
  \\text{Erro} = \\ |f(${(step as SecanteMethodStep).xNext.toFixed(4)})| = ${(
              step as SecanteMethodStep
            ).erro.toFixed(6)}`}
            iteracao={step.iteracao}
          />
        );
      default:
        break;
    }
  }
  return <>{steps.map((s, key) => renderSelectedMethodCard(method, s, key))}</>;
}
