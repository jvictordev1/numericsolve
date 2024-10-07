import numericSolveApi from "@/api/numericSolveApi";
import {
  BissectionMethodResponse,
  ErrorResponse,
  FalsePositionMethodResponse,
  NewtonRaphsonResponse,
  SecantMethodResponse,
} from "@/common";
import Loader from "@/components/Loader";
import MethodsInterval from "@/components/MethodsInterval";
import ResultHandler from "@/components/ResultHandler";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

export default function Equations() {
  const [equation, setEquation] = useState("");
  const [tolerance, setTolerance] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("bisseccao");
  const [firstIntervalNumber, setFirstIntervalNumber] = useState(0);
  const [secondIntervalNumber, setSecondIntervalNumber] = useState(0);
  const [iterations, setIterations] = useState(0);
  const [secondIterations, setSecondIterations] = useState(0);
  const [results, setResults] = useState<
    Array<
      | BissectionMethodResponse
      | FalsePositionMethodResponse
      | NewtonRaphsonResponse
      | SecantMethodResponse
    >
  >([]);
  const [error, setError] = useState<ErrorResponse>();
  const [isLoaderOn, setIsLoaderOn] = useState(false);
  const [secondMethod, setSecondMethod] = useState("");

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoaderOn(true);
    const template = {
      funcao: equation,
      tolerancia: tolerance,
      maxIteracao: iterations,
    };
    let data;
    if (
      selectedMethod === "bisseccao" ||
      selectedMethod === "fp" ||
      selectedMethod === "secante"
    ) {
      data = {
        ...template,
        intervalo: [firstIntervalNumber, secondIntervalNumber],
      };
    } else {
      data = {
        ...template,
        chuteInicial: firstIntervalNumber,
      };
    }
    numericSolveApi
      .post(`/${selectedMethod}`, data)
      .then((res) => {
        const r = res.data.resultado;
        const data = {
          ...r,
          metodo: selectedMethod,
        };
        if ("error" in r) {
          setError(r);
          return;
        }
        setResults([data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoaderOn(false);
      });
  }
  function handleContinueSolution(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoaderOn(true);
    numericSolveApi
      .post("/continuarSolucao", {
        metodoEscolhido: secondMethod,
        novasIteracoes: secondIterations,
      })
      .then((res) => {
        const r = res.data.novoResultado.resultado;
        const data = {
          ...r,
          metodo: secondMethod,
        };
        if ("error" in r) {
          setError(r);
          return;
        }
        setResults((prev) => [...prev, data]);
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
              disabled={results.length ? true : false}
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
              disabled={results.length ? true : false}
            />
            <Select
              required
              onValueChange={(val) => setSelectedMethod(val)}
              value={selectedMethod}
              disabled={results.length ? true : false}
            >
              <SelectTrigger className="shadow-none border-2 border-zinc-300 focus:border-zinc-900">
                <SelectValue placeholder="Método" />
              </SelectTrigger>
              <SelectContent>
                {methods.map((m) => {
                  return (
                    <SelectItem key={m.value} value={m.value}>
                      {m.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <MethodsInterval
              selectedMethod={selectedMethod}
              result={results.length ? true : false}
              setFirstIntervalNumber={(n: number) => setFirstIntervalNumber(n)}
              setSecondIntervalNumber={(n: number) =>
                setSecondIntervalNumber(n)
              }
            />
            <Input
              required
              type="number"
              name="iterations"
              id="iterations"
              onChange={(e) => setIterations(Number(e.target.value))}
              min="2"
              max="1000"
              placeholder="Máximo de iterações"
              className="border-2 border-zinc-300 focus:border-zinc-900"
              disabled={results.length ? true : false}
            />
            <button
              className="bg-green-500 rounded-md text-zinc-100 text-xl py-2 disabled:bg-zinc-500"
              type="submit"
              disabled={results.length ? true : false}
            >
              Resolver!
            </button>
          </form>
          {results.length !== 0 && (
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
                      onClick={() => {
                        setResults([]);
                      }}
                    />
                  </button>
                </div>
              </div>
              {results.map((r, index) => {
                return error ? (
                  <h2 className="font-semibold text-red-500">
                    Erro: {error.error}
                  </h2>
                ) : (
                  <ResultHandler
                    key={index}
                    equation={equation}
                    firstIntervalNumber={firstIntervalNumber}
                    secondIntervalNumber={
                      secondIntervalNumber && secondIntervalNumber
                    }
                    result={r}
                    tolerance={tolerance}
                    selectedMethod={r.metodo}
                    index={index}
                  />
                );
              })}
              {results[results.length - 1].convergiu ? (
                ""
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">
                      Continuar por outro método?
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center bg-zinc-100">
                      <form
                        className="flex flex-col w-full gap-4"
                        onSubmit={(e) => handleContinueSolution(e)}
                      >
                        <Select
                          onValueChange={(val) => setSecondMethod(val)}
                          required
                        >
                          <SelectTrigger className="shadow-none border-2 border-zinc-300 focus:border-zinc-900">
                            <SelectValue placeholder="Método" />
                          </SelectTrigger>
                          <SelectContent>
                            {methods.map((m) => {
                              return (
                                <SelectItem
                                  key={m.value}
                                  value={m.value}
                                  disabled={
                                    m.value ===
                                    results[results.length - 1].metodo
                                      ? true
                                      : false
                                  }
                                >
                                  {m.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <Input
                          required
                          type="number"
                          name="iterations"
                          id="iterations"
                          min="2"
                          max="1000"
                          placeholder="Máximo de iterações"
                          className="border-2 border-zinc-300 focus:border-zinc-900"
                          onChange={(e) =>
                            setSecondIterations(Number(e.target.value))
                          }
                        />
                        <button
                          className="bg-green-500 rounded-md text-zinc-100 text-xl py-2 disabled:bg-zinc-500"
                          type="submit"
                        >
                          Continuar
                        </button>
                      </form>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </section>
          )}
        </section>
      )}
    </>
  );
}
