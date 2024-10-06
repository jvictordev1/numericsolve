import {
  BissectionMethodStep,
  FalsePositionMethodStep,
  NewtonRaphsonStep,
  SecanteMethodStep,
} from "@/common";
import MethodResponse from "../MethodResponse";

interface IterationsHandlerProps {
  method: string;
  steps:
    | BissectionMethodStep[]
    | FalsePositionMethodStep[]
    | NewtonRaphsonStep[]
    | SecanteMethodStep[];
}
export default function IterationsHandler({
  method,
  steps,
}: IterationsHandlerProps) {
  function numFormat(num: number) {
    if (num === Math.floor(num)) {
      return String(num);
    }
    return String(num.toFixed(6));
  }
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
          \\overline{x} = \\frac{${numFormat(
            (step as BissectionMethodStep).intervaloAtual.a
          )} + ${numFormat(
              (step as BissectionMethodStep).intervaloAtual.b
            )}}{2} = ${(step as BissectionMethodStep).pontoMedio.toFixed(6)}
      `}
            formulaValorFuncao={`
      f(\\overline{x}) = f(${numFormat(
        (step as BissectionMethodStep).pontoMedio
      )}) = ${numFormat((step as BissectionMethodStep).valorFuncao)}
    `}
            formulaErro={`
    \\epsilon = \\ |f(${numFormat(
      (step as BissectionMethodStep).pontoMedio
    )})| = ${numFormat((step as BissectionMethodStep).erro)}
  `}
          />
        );
      case "fp":
        return (
          <MethodResponse
            key={key}
            formulaPonto={`
    \\overline{x} = \\frac{${numFormat(
      (step as FalsePositionMethodStep).intervaloAtual.a
    )}*f(${numFormat(
              (step as FalsePositionMethodStep).intervaloAtual.b
            )}) - ${numFormat(
              (step as FalsePositionMethodStep).intervaloAtual.b
            )}*f(${numFormat(
              (step as FalsePositionMethodStep).intervaloAtual.a
            )})}{f(${numFormat(
              (step as FalsePositionMethodStep).intervaloAtual.b
            )})-f(${numFormat(
              (step as FalsePositionMethodStep).intervaloAtual.a
            )})} = ${numFormat(
              (step as FalsePositionMethodStep).pontoFalsaPosicao
            )}
`}
            formulaValorFuncao={`
f(\\overline{x}) = f(${numFormat(
              (step as FalsePositionMethodStep).pontoFalsaPosicao
            )}) = ${numFormat((step as FalsePositionMethodStep).valorFuncao)}
`}
            formulaErro={`
\\epsilon = \\ |f(${numFormat(
              (step as FalsePositionMethodStep).pontoFalsaPosicao
            )})| = ${numFormat((step as FalsePositionMethodStep).erro)}
`}
            iteracao={step.iteracao}
          />
        );
      case "newtonRaphson":
        return (
          <MethodResponse
            key={key}
            formulaPonto={`
          \\overline{x} = \\ ${numFormat(
            (step as NewtonRaphsonStep).xAtual
          )} - \\frac{f(${numFormat(
              (step as NewtonRaphsonStep).xAtual
            )})}{f'(${numFormat(
              (step as NewtonRaphsonStep).xAtual
            )})} = ${numFormat((step as NewtonRaphsonStep).xNovo)}
        `}
            formulaValorFuncao={`
  f(\\overline{x}) = f(${numFormat(
    (step as NewtonRaphsonStep).xNovo
  )}) = ${numFormat((step as NewtonRaphsonStep).valorFuncao)}
`}
            formulaErro={`
  \\epsilon = \\ |f(${numFormat(
    (step as NewtonRaphsonStep).xNovo
  )})| = ${numFormat((step as NewtonRaphsonStep).erro)}
`}
            iteracao={step.iteracao}
          />
        );
      case "secante":
        return (
          <MethodResponse
            key={key}
            formulaPonto={`
        \\overline{x} = \\frac{[${numFormat(
          (step as SecanteMethodStep).xPrev
        )}*f(${numFormat((step as SecanteMethodStep).xCurr)}) - ${(
              step as SecanteMethodStep
            ).xCurr.toFixed(4)}*f(${numFormat(
              (step as SecanteMethodStep).xPrev
            )})]}{f(${numFormat(
              (step as SecanteMethodStep).xCurr
            )})-f(${numFormat(
              (step as SecanteMethodStep).xPrev
            )})} = ${numFormat((step as SecanteMethodStep).xNext)}
    `}
            formulaValorFuncao={`
  f(\\overline{x}) = f(${numFormat(
    (step as SecanteMethodStep).xNext
  )}) = ${numFormat((step as SecanteMethodStep).fXCurr)}
`}
            formulaErro={`
  \\epsilon = \\ |f(${numFormat(
    (step as SecanteMethodStep).xNext
  )})| = ${numFormat((step as SecanteMethodStep).erro)}`}
            iteracao={step.iteracao}
          />
        );
      default:
        break;
    }
  }
  return <>{steps.map((s, key) => renderSelectedMethodCard(method, s, key))}</>;
}
