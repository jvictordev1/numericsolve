import {
  BissectionMethodStep,
  FalsePositionMethodStep,
  NewtonRaphsonStep,
  SecanteMethodStep,
} from "@/common";
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

interface ChartProps {
  selectedMethod: string;
  steps:
    | BissectionMethodStep[]
    | FalsePositionMethodStep[]
    | NewtonRaphsonStep[]
    | SecanteMethodStep[];
  methodData: string;
}

export default function Chart({
  selectedMethod,
  steps,
  methodData,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart
        data={steps}
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
          dataKey={selectedMethod === "secante" ? "fXCurr" : "valorFuncao"}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={selectedMethod === "secante" ? "fXCurr" : "valorFuncao"}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Valor de f(x)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
