import {
  BissectionMethodStep,
  FalsePositionMethodStep,
  NewtonRaphsonStep,
  SecanteMethodStep,
} from "@/common";
import BissectionMethod from "../BissectionMethod";
import FalsePositionMethod from "../FalsePositionMethod";
import NewtonRaphsonMethod from "../NewtonRaphsonMethod";
import SecantMethod from "../SecantMethod";

interface ResultHandlerProps {
  method: string;
  steps:
    | BissectionMethodStep[]
    | FalsePositionMethodStep[]
    | NewtonRaphsonStep[]
    | SecanteMethodStep[];
}
export default function ResultHandler({ method, steps }: ResultHandlerProps) {
  function renderSelectedMethodCard(
    method: string,
    step:
      | BissectionMethodStep
      | FalsePositionMethodStep
      | NewtonRaphsonStep
      | SecanteMethodStep
  ) {
    switch (method) {
      case "bisseccao":
        return <BissectionMethod {...(step as BissectionMethodStep)} />;
      case "fp":
        return <FalsePositionMethod {...(step as FalsePositionMethodStep)} />;
      case "newtonRaphson":
        return <NewtonRaphsonMethod {...(step as NewtonRaphsonStep)} />;
      case "secante":
        return <SecantMethod {...(step as SecanteMethodStep)} />;
      default:
        break;
    }
  }
  return <>{steps.map((s) => renderSelectedMethodCard(method, s))}</>;
}
