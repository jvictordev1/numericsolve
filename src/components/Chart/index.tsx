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
  steps:
    | BissectionMethodStep[]
    | FalsePositionMethodStep[]
    | NewtonRaphsonStep[]
    | SecanteMethodStep[];
}

export default function Chart({ steps }: ChartProps) {
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
        <XAxis dataKey="xAprox" />
        <YAxis dataKey="fxAprox" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="fxAprox"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Valor de f(x)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
