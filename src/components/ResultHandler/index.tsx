import {
  BissectionMethodResponse,
  BissectionMethodStep,
  FalsePositionMethodResponse,
  NewtonRaphsonResponse,
  NewtonRaphsonStep,
  SecanteMethodStep,
  SecantMethodResponse,
} from "@/common";
import { InlineMath } from "react-katex";
import Chart from "../Chart";
import IterationsHandler from "../IterationsHandler";

interface ResultHandlerP {
  result:
    | BissectionMethodResponse
    | FalsePositionMethodResponse
    | NewtonRaphsonResponse
    | SecantMethodResponse;
  equation: string;
  tolerance: number;
  selectedMethod: string;
  firstIntervalNumber: number;
  secondIntervalNumber?: number;
  index: number;
}

export default function ResultHandler({
  result,
  equation,
  tolerance,
  selectedMethod,
  firstIntervalNumber,
  secondIntervalNumber,
  index,
}: ResultHandlerP) {
  const methods = [
    {
      name: "Bissecção",
      value: "bisseccao",
    },
    {
      name: "Falsa Posição",
      value: "fp",
    },
    {
      name: "Newton-Raphson",
      value: "newtonRaphson",
    },
    {
      name: "Secante",
      value: "secante",
    },
  ];
  function numFormat(num: number) {
    if (num === Math.floor(num)) {
      return String(num);
    }
    return String(num.toFixed(6));
  }
  return (
    <>
      {index >= 1 && (
        <h1 className="text-2xl">
          Continuação {index} -{" "}
          {methods.find((m) => m.value === selectedMethod)?.name}
        </h1>
      )}
      <>
        <div>
          <p>
            Calcular <InlineMath math={equation} /> com Erro ={" "}
            <InlineMath math={String(tolerance)} /> e{" "}
            {selectedMethod === "bisseccao" || selectedMethod === "fp" ? (
              <InlineMath
                math={`Intervalo [${
                  index >= 1
                    ? numFormat(
                        (result.passos[0] as BissectionMethodStep)
                          .intervaloAtual.a
                      )
                    : firstIntervalNumber
                }, ${
                  index >= 1
                    ? numFormat(
                        (result.passos[0] as BissectionMethodStep)
                          .intervaloAtual.b
                      )
                    : secondIntervalNumber
                }]`}
              />
            ) : selectedMethod === "newtonRaphson" ? (
              <InlineMath
                math={`x_0 = ${
                  index >= 1
                    ? numFormat((result.passos[0] as NewtonRaphsonStep).xAtual)
                    : firstIntervalNumber
                }`}
              />
            ) : (
              <InlineMath
                math={`[x_0 = ${
                  index >= 1
                    ? numFormat((result.passos[0] as SecanteMethodStep).a)
                    : firstIntervalNumber
                };x_1 = ${
                  index >= 1
                    ? numFormat((result.passos[0] as SecanteMethodStep).b)
                    : secondIntervalNumber
                }]`}
              />
            )}{" "}
            Utilizando o método da{" "}
            {methods.find((m) => m.value === selectedMethod)?.name}.
          </p>
          {"derivada" in result ? (
            <p>
              Derivada: <InlineMath math={result.derivada} />
            </p>
          ) : null}
        </div>
        <p>
          Função
          {result.convergiu ? " convergiu" : " não convergiu"}. Erro de{" "}
          <InlineMath math={`\\epsilon = ${result.erro.toFixed(6)}`} /> e{" "}
          <InlineMath math={`${result.iteracoes}`} /> iterações
          {result.convergiu ? (
            <span>
              , com raiz{" "}
              <InlineMath math={`\\overline{x} = ${result.raiz.toFixed(6)}`} />
            </span>
          ) : (
            ""
          )}
          .
        </p>
        <hr />
        <section>
          <IterationsHandler method={selectedMethod} steps={result.passos} />
        </section>
        <h4 className="text-xl font-medium">Comportamento do método</h4>
        <section className="w-full h-72">
          <Chart steps={result.passos} />
        </section>
      </>
    </>
  );
}
