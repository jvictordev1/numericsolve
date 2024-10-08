import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

interface MethodResponse {
  formulaPonto: string;
  formulaValorFuncao: string;
  formulaErro: string;
  iteracao: number;
}

export default function MethodResponse({
  formulaPonto,
  formulaValorFuncao,
  formulaErro,
  iteracao,
}: MethodResponse) {
  return (
    <div className="w-full">
      <h4 className="text-xl font-medium">Iteração {iteracao}</h4>
      <div className="overflow-scroll">
        <BlockMath>{formulaPonto}</BlockMath>
        <BlockMath>{formulaValorFuncao}</BlockMath>
        <BlockMath>{formulaErro}</BlockMath>
      </div>
    </div>
  );
}
