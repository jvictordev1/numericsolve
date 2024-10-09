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
            )}}{2} = ${numFormat((step as BissectionMethodStep).xAprox)}
      `}
            formulaValorFuncao={`
      f(\\overline{x}) = f(${numFormat(
        (step as BissectionMethodStep).xAprox
      )}) = ${numFormat((step as BissectionMethodStep).fxAprox)}
    `}
            formulaErro={`
    \\epsilon = \\ |f(${numFormat(
      (step as BissectionMethodStep).xAprox
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
            )})} = ${numFormat((step as FalsePositionMethodStep).xAprox)}
`}
            formulaValorFuncao={`
f(\\overline{x}) = f(${numFormat(
              (step as FalsePositionMethodStep).xAprox
            )}) = ${numFormat((step as FalsePositionMethodStep).fxAprox)}
`}
            formulaErro={`
\\epsilon = \\ |f(${numFormat(
              (step as FalsePositionMethodStep).xAprox
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
            )})} = ${numFormat((step as NewtonRaphsonStep).xAprox)}
        `}
            formulaValorFuncao={`
  f(\\overline{x}) = f(${numFormat(
    (step as NewtonRaphsonStep).xAprox
  )}) = ${numFormat((step as NewtonRaphsonStep).fxAprox)}
`}
            formulaErro={`
  \\epsilon = \\ |f(${numFormat(
    (step as NewtonRaphsonStep).xAprox
  )})| = ${numFormat((step as NewtonRaphsonStep).fxAprox)}
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
          (step as SecanteMethodStep).a
        )}*f(${numFormat((step as SecanteMethodStep).b)}) - ${numFormat(
              (step as SecanteMethodStep).b
            )}*f(${numFormat((step as SecanteMethodStep).a)})]}{f(${numFormat(
              (step as SecanteMethodStep).b
            )})-f(${numFormat((step as SecanteMethodStep).a)})} = ${numFormat(
              (step as SecanteMethodStep).xAprox
            )}
    `}
            formulaValorFuncao={`
  f(\\overline{x}) = f(${numFormat(
    (step as SecanteMethodStep).xAprox
  )}) = ${numFormat((step as SecanteMethodStep).fxAprox)}
`}
            formulaErro={`
  \\epsilon = \\ |f(${numFormat(
    (step as SecanteMethodStep).xAprox
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
