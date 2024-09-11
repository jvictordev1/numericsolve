import Navbar from "@/components/Navbar";
import React from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import { FaChartArea } from "react-icons/fa";
import { IoMdCalculator } from "react-icons/io";

interface CardContent {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function LandingPage() {
  const cardsContent: CardContent[] = [
    {
      icon: <IoMdCalculator className="text-7xl text-zinc-100" />,
      title: "Cálculos rápidos",
      description: "Tenha agilidade nos seus cálculos com nossa plataforma.",
    },
    {
      icon: <CiTextAlignLeft className="text-7xl text-zinc-100" />,
      title: "Descrição intuitiva",
      description: "Tenha acesso a descrição passo-a-passo da solução.",
    },
    {
      icon: <FaChartArea className="text-7xl text-zinc-100" />,
      title: "Gráfico da solução",
      description:
        "Tenha acesso ao gŕafico da solução para ter uma interpretação visual.",
    },
  ];
  return (
    <>
      <Navbar />
      <section className="flex flex-col gap-20 items-center h-dvh pt-32">
        <h1 className="text-5xl max-w-3xl text-center text-neutral-900">
          Seu Caminho Rápido para{" "}
          <span className="font-semibold">Soluções Numéricas</span>.
        </h1>
        <ul className="flex gap-12">
          {cardsContent.map((c) => {
            return (
              <li className="h-64 w-52">
                <div className="flex items-center justify-center w-full h-1/2 bg-blue-600 rounded-sm mb-6">
                  {c.icon}
                </div>
                <div className="flex flex-col text-center gap-4">
                  <h1 className="text-xl font-semibold text-neutral-900">
                    {c.title}
                  </h1>
                  <p className="text-neutral-700">{c.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
