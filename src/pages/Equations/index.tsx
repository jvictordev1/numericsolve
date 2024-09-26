import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputHTMLAttributes, useState } from "react";

export default function Equations() {
  const [intervalOption, setIntervalOption] = useState("findInterval");
  return (
    <>
      <section className="flex flex-col gap-12 items-center px-4 md:gap-20">
        <h1 className="text-4xl max-w-3xl text-center text-neutral-900 md:w-2xl md:text-5xl">
          Resolva suas equações utilizando{" "}
          <span className="font-semibold">métodos numéricos</span>
        </h1>
        <form className="flex flex-col w-96 gap-4 sm:w-[600px]">
          <Input required type="text" name="" id="" />
          <Select required>
            <SelectTrigger className="shadow-none">
              <SelectValue placeholder="Método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bisseccao">Bissecção</SelectItem>
              <SelectItem value="falsaPosicao">Falsa Posição</SelectItem>
              <SelectItem value="newton">Newton-Raphson</SelectItem>
              <SelectItem value="secante">Secante</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex w-full justify-between">
            <button
              type="button"
              onClick={() => setIntervalOption("findInterval")}
            >
              Encontrar intervalo
            </button>
            <button
              type="button"
              onClick={() => setIntervalOption("setInterval")}
            >
              Inserir intervalo
            </button>
          </div>
          {intervalOption === "setInterval" ? (
            <div className="flex flex-col items-center w-full gap-2">
              <Input type="number" name="" id="" />
              <h4>até</h4>
              <Input type="number" name="" id="" />
            </div>
          ) : null}
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
export function InputElement({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <Input {...props} />;
}
