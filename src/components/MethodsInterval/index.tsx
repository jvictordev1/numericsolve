import { Input } from "../ui/input";

interface MethodsIntervalProps {
  selectedMethod: string;
  result?: boolean;
  setFirstIntervalNumber: (n: number) => void;
  setSecondIntervalNumber: (n: number) => void;
  firstIntervalNumber?: number;
  secondIntervalNumber?: number;
}

export default function MethodsInterval({
  selectedMethod,
  result = false,
  setFirstIntervalNumber,
  setSecondIntervalNumber,
  firstIntervalNumber,
  secondIntervalNumber,
}: MethodsIntervalProps) {
  return (
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
              value={firstIntervalNumber}
              placeholder="1"
              step="0.001"
              className="border-2 border-zinc-300 focus:border-zinc-900"
              disabled={result}
            />
            <h4>até</h4>
            <Input
              required
              type="number"
              name="second-interval-number"
              id="second-interval-number"
              onChange={(e) => setSecondIntervalNumber(Number(e.target.value))}
              value={secondIntervalNumber}
              placeholder="2"
              step="0.001"
              className="border-2 border-zinc-300 focus:border-zinc-900"
              disabled={result}
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
            onChange={(e) => setFirstIntervalNumber(Number(e.target.value))}
            value={firstIntervalNumber}
            placeholder="1"
            className="border-2 border-zinc-300 focus:border-zinc-900"
            disabled={result}
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
              onChange={(e) => setFirstIntervalNumber(Number(e.target.value))}
              value={firstIntervalNumber}
              placeholder="x0"
              className="border-2 border-zinc-300 focus:border-zinc-900"
              disabled={result}
            />
            <Input
              required
              type="number"
              name="second-interval-number"
              id="second-interval-number"
              step="0.001"
              onChange={(e) => setSecondIntervalNumber(Number(e.target.value))}
              value={secondIntervalNumber}
              placeholder="x1"
              className="border-2 border-zinc-300 focus:border-zinc-900"
              disabled={result}
            />
          </div>
        </>
      )}
    </div>
  );
}
