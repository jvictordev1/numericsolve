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
import { Bot, CircleX } from "lucide-react";
import { useState } from "react";
import { InlineMath } from "react-katex";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Equations() {
  const [equation, setEquation] = useState("");
  const [tolerance, setTolerance] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("bisseccao");
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
  const [methodData, setMethodData] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoaderOn(true);
    const template = {
      funcao: equation,
      tolerancia: tolerance,
      maxIteracao: iterations,
    };
    let data;
    if (selectedMethod === "bisseccao" || selectedMethod === "fp") {
      data = {
        ...template,
        intervalo: [firstIntervalNumber, secondIntervalNumber],
      };
      if (selectedMethod === "bisseccao") {
        setMethodData("pontoMedio");
      } else {
        setMethodData("pontoFalsaPosicao");
      }
    } else {
      if (selectedMethod === "newtonRaphson") {
        data = {
          ...template,
          chuteInicial: firstIntervalNumber,
        };
        setMethodData("xAtual");
      } else {
        data = {
          ...template,
          x0: firstIntervalNumber,
          x1: secondIntervalNumber,
        };
        setMethodData("xCurr");
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
        if (selectedMethod === "secante") {
          setResult(r);
          return;
        }
        setResult(r.resultado);
      })
      .catch((err) => {
        setResult(err.response.data);
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
              step="0.000001"
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
                  <h3 className="text-xl">Valor Inicial</h3>
                  <Input
                    required
                    type="number"
                    name="first-interval-number"
                    id="first-interval-number"
                    step="0.001"
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
            <section className="flex flex-col border p-4 rounded-sm w-full gap-4 sm:w-[600px] md:w-[700px] lg:w-[800px]">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl">Resultado</h1>
                <div className="flex gap-2 items-center" title="Dúvidas?">
                  <button type="button">
                    <Bot className="text-blue-500 text-2xl" />
                  </button>
                  <button type="button" title="Apagar resultado">
                    <CircleX
                      className="text-red-500 text-2xl"
                      onClick={() => setResult(null)}
                    />
                  </button>
                </div>
              </div>

              {"error" in result ? (
                <h2>Erro: {result.error}</h2>
              ) : (
                <>
                  <div>
                    <p>
                      Calcular <InlineMath math={equation} /> com Erro ={" "}
                      <InlineMath math={String(tolerance)} /> e{" "}
                      {selectedMethod === "bisseccao" ||
                      selectedMethod === "fp" ? (
                        <InlineMath
                          math={`Intervalo [${firstIntervalNumber}, ${secondIntervalNumber}]`}
                        />
                      ) : selectedMethod === "newtonRaphson" ? (
                        <InlineMath math={`x0 = ${firstIntervalNumber}`} />
                      ) : (
                        <InlineMath
                          math={`[x0 = ${firstIntervalNumber};x1 = ${secondIntervalNumber}]`}
                        />
                      )}
                      .
                    </p>
                    {"derivada" in result ? (
                      <p>
                        Derivada: <InlineMath math={result.derivada} />
                      </p>
                    ) : null}
                  </div>
                  <p>
                    Função
                    {result.convergiu ? " convergiu" : " não convergiu"} com
                    erro de {result.erro.toFixed(6)} através de{" "}
                    {result.iteracoes} iterações, com raiz ={" "}
                    {result.raiz.toFixed(4)}.
                  </p>
                  <hr />
                  <ResultHandler
                    method={selectedMethod}
                    steps={result.passos}
                  />
                  <h4 className="text-xl font-medium">
                    Comportamento do método
                  </h4>
                  <section className="w-full h-72">
                    <ResponsiveContainer width="100%" height="80%">
                      <LineChart
                        data={result.passos}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        className="-ml-4"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={methodData} />
                        <YAxis
                          dataKey={
                            selectedMethod === "secante"
                              ? "fXCurr"
                              : "valorFuncao"
                          }
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey={
                            selectedMethod === "secante"
                              ? "fXCurr"
                              : "valorFuncao"
                          }
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          name="Valor de f(x)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </section>
                </>
              )}
            </section>
          )}
        </section>
      )}
    </>
  );
}
