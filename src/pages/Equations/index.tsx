import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Equations() {
  const [equation, setEquation] = useState("");
  const [tolerance, setTolerance] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [firstIntervalNumber, setFirstIntervalNumber] = useState(0);
  const [secondIntervalNumber, setSecondIntervalNumber] = useState(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
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
            placeholder="Equação: x² + 3x + 2"
            className="border-2 border-zinc-300 focus:border-zinc-900"
          />
          <Input
            required
            type="number"
            name="tolerance"
            id="tolerance"
            onChange={(e) => setTolerance(Number(e.target.value))}
            min="0"
            step="0.001"
            placeholder="Tolerância"
            className="border-2 border-zinc-300 focus:border-zinc-900"
          />
          <Select required onValueChange={(val) => setSelectedMethod(val)}>
            <SelectTrigger className="shadow-none border-2 border-zinc-300 focus:border-zinc-900">
              <SelectValue placeholder="Método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bisseccao">Bissecção</SelectItem>
              <SelectItem value="falsaPosicao">Falsa Posição</SelectItem>
              <SelectItem value="newton">Newton-Raphson</SelectItem>
              <SelectItem value="secante">Secante</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-2">
            {selectedMethod === "bisseccao" ||
            selectedMethod === "falsaPosicao" ? (
              <>
                <h3 className="text-xl">Intervalo</h3>
                <div className="flex flex-col items-center w-full gap-2">
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
                  />
                </div>
              </>
            ) : selectedMethod === "newton" ? (
              <>
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
                    onChange={(e) =>
                      setFirstIntervalNumber(Number(e.target.value))
                    }
                    placeholder="x0"
                    className="border-2 border-zinc-300 focus:border-zinc-900"
                  />
                  <Input
                    required
                    type="number"
                    name="second-interval-number"
                    id="second-interval-number"
                    onChange={(e) =>
                      setSecondIntervalNumber(Number(e.target.value))
                    }
                    placeholder="x1"
                    className="border-2 border-zinc-300 focus:border-zinc-900"
                  />
                </div>
              </>
            )}
          </div>
          <button
            className="bg-green-500 rounded-md text-zinc-100 text-xl py-2"
            type="submit"
          >
            Resolver!
          </button>
        </form>
      </section>
    </>
  );
}
