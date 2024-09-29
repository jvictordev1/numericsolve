import numericSolveApi from "@/api/numericSolveApi";
import {
  BissectionMethodResponse,
  ErrorResponse,
  FalsePositionMethodResponse,
  NewtonRaphsonResponse,
  SecantMethodResponse,
} from "@/common";
import Loader from "@/components/Loader";
import ResultHandler from "@/components/ResultHandler";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { InlineMath } from "react-katex";

export default function Equations() {
  const [equation, setEquation] = useState("");
  const [tolerance, setTolerance] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("bisseccao");
  const [derivative, setDerivative] = useState("");
  const [firstIntervalNumber, setFirstIntervalNumber] = useState(0);
  const [secondIntervalNumber, setSecondIntervalNumber] = useState(0);
  const [iterations, setIterations] = useState(0);
  const [result, setResult] = useState<
    | BissectionMethodResponse
    | FalsePositionMethodResponse
    | NewtonRaphsonResponse
    | SecantMethodResponse
    | ErrorResponse
    | null
  >(null);
  const [isLoaderOn, setIsLoaderOn] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoaderOn(true);
    let data;
    if (selectedMethod === "bisseccao" || selectedMethod === "fp") {
      data = {
        funcao: equation,
        intervalo: [firstIntervalNumber, secondIntervalNumber],
        tolerancia: tolerance,
        maxIteracao: iterations,
      };
    } else {
      if (selectedMethod === "newtonRaphson") {
        data = {
          funcao: equation,
          derivada: derivative,
          chuteInicial: firstIntervalNumber,
          tolerancia: tolerance,
          maxIteracao: iterations,
        };
      } else {
        data = {
          funcao: equation,
          x0: firstIntervalNumber,
          x1: secondIntervalNumber,
          tolerancia: tolerance,
          maxIteracao: iterations,
        };
      }
    }
    numericSolveApi
      .post(`/${selectedMethod}`, data)
      .then((res) => {
        const r = res.data.resultado;
        if ("error" in r) {
          setResult(r);
          return;
        }
        setResult(r.resultado);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoaderOn(false);
      });
  }

  return (
    <>
      {isLoaderOn ? (
        <Loader />
      ) : (
        <section className="flex flex-col gap-12 items-center px-4 md:gap-20">
          <h1 className="text-4xl max-w-3xl text-center text-neutral-900 md:w-2xl md:text-5xl">
            Resolva suas equações utilizando{" "}
            <span className="font-semibold">métodos numéricos</span>
          </h1>
          <form
            className="flex flex-col w-4/5 gap-4 sm:w-[600px]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              required
              type="text"
              name="equation"
              id="equation"
              onChange={(e) => setEquation(e.target.value)}
              value={equation}
              placeholder="Equação: x² + 3x + 2"
              className="border-2 border-zinc-300 focus:border-zinc-900"
              disabled={result ? true : false}
            />
            <Input
              required
              type="number"
              name="tolerance"
              id="tolerance"
              onChange={(e) => setTolerance(Number(e.target.value))}
              min="0"
              max="1"
              step="0.001"
              placeholder="Tolerância"
              className="border-2 border-zinc-300 focus:border-zinc-900"
              disabled={result ? true : false}
            />
            <Select
              required
              onValueChange={(val) => setSelectedMethod(val)}
              value={selectedMethod}
              disabled={result ? true : false}
            >
              <SelectTrigger className="shadow-none border-2 border-zinc-300 focus:border-zinc-900">
                <SelectValue placeholder="Método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bisseccao">Bissecção</SelectItem>
                <SelectItem value="fp">Falsa Posição</SelectItem>
                <SelectItem value="newtonRaphson">Newton-Raphson</SelectItem>
                <SelectItem value="secante">Secante</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-2 mb-2">
              {selectedMethod === "bisseccao" || selectedMethod === "fp" ? (
                <>
                  <h3 className="text-xl">Intervalo</h3>
                  <div className="flex flex-col items-center w-full gap-2">
                    <Input
                      required
                      type="number"
                      name="first-interval-number"
                      id="first-interval-number"
                      onChange={(e) => {
                        setFirstIntervalNumber(Number(e.target.value));
                      }}
                      placeholder="1"
                      className="border-2 border-zinc-300 focus:border-zinc-900"
                      disabled={result ? true : false}
                    />
                    <h4>até</h4>
                    <Input
                      required
                      type="number"
                      name="second-interval-number"
                      id="second-interval-number"
                      onChange={(e) =>
                        setSecondIntervalNumber(Number(e.target.value))
                      }
                      placeholder="2"
                      className="border-2 border-zinc-300 focus:border-zinc-900"
                      disabled={result ? true : false}
                    />
                  </div>
                </>
              ) : selectedMethod === "newtonRaphson" ? (
                <>
                  <Input
                    required
                    type="text"
                    name="derivative"
                    id="derivative"
                    onChange={(e) => setDerivative(e.target.value)}
                    value={derivative}
                    placeholder="Derivada: 2x + 3"
                    className="border-2 border-zinc-300 focus:border-zinc-900"
                    disabled={result ? true : false}
                  />
                  <h3 className="text-xl">Valor Inicial</h3>
                  <Input
                    required
                    type="number"
                    name="first-interval-number"
                    id="first-interval-number"
                    onChange={(e) =>
                      setFirstIntervalNumber(Number(e.target.value))
                    }
                    placeholder="1"
                    className="border-2 border-zinc-300 focus:border-zinc-900"
                    disabled={result ? true : false}
                  />
                </>
              ) : (
                <>
                  <h3 className="text-xl">Valores iniciais</h3>
                  <div className="flex flex-col items-center w-full gap-2">
                    <Input
                      required
                      type="number"
                      name="first-interval-number"
                      id="first-interval-number"
                      step="0.001"
                      onChange={(e) =>
                        setFirstIntervalNumber(Number(e.target.value))
                      }
                      placeholder="x0"
                      className="border-2 border-zinc-300 focus:border-zinc-900"
                      disabled={result ? true : false}
                    />
                    <Input
                      required
                      type="number"
                      name="second-interval-number"
                      id="second-interval-number"
                      step="0.001"
                      onChange={(e) =>
                        setSecondIntervalNumber(Number(e.target.value))
                      }
                      placeholder="x1"
                      className="border-2 border-zinc-300 focus:border-zinc-900"
                      disabled={result ? true : false}
                    />
                  </div>
                </>
              )}
            </div>
            <Input
              required
              type="number"
              name="iterations"
              id="iterations"
              onChange={(e) => setIterations(Number(e.target.value))}
              min="10"
              max="1000"
              placeholder="Máximo de iterações"
              className="border-2 border-zinc-300 focus:border-zinc-900"
              disabled={result ? true : false}
            />
            <button
              className="bg-green-500 rounded-md text-zinc-100 text-xl py-2 disabled:bg-zinc-500"
              type="submit"
              disabled={result ? true : false}
            >
              Resolver!
            </button>
          </form>
          {result && (
            <section className="flex flex-col border p-4 rounded-sm w-4/5 gap-4 sm:w-[600px] md:w-[700px] lg:w-[800px]">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl">Resultado</h1>
                <button type="button">
                  <CircleX
                    className="text-red-500 text-2xl"
                    onClick={() => setResult(null)}
                  />
                </button>
              </div>
              {"error" in result ? (
                <h2>Erro: {result.error}</h2>
              ) : (
                <>
                  <h2>
                    <InlineMath math={equation} /> com Erro ={" "}
                    <InlineMath math={String(tolerance)} />
                  </h2>
                  <p>
                    Função
                    {result.convergiu ? " convergiu" : " não convergiu"} com
                    erro de {result.erro.toFixed(4)} através de{" "}
                    {result.iteracoes} iterações, com raiz ={" "}
                    {result.raiz.toFixed(4)}.
                  </p>
                  <hr />
                  <ResultHandler
                    method={selectedMethod}
                    steps={result.passos}
                  />
                </>
              )}
            </section>
          )}
        </section>
      )}
    </>
  );
}
