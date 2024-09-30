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
      <section className="flex flex-col gap-12 items-center px-4 md:gap-20">
        <h1 className="text-4xl max-w-3xl text-center text-neutral-900 md:w-2xl md:text-5xl">
          Seu Caminho Rápido para{" "}
          <span className="font-semibold">Soluções Numéricas</span>.
        </h1>
        <ul className="flex flex-wrap items-center justify-center gap-12 mb-4">
          {cardsContent.map((c) => {
            return (
              <li key={c.title} className="h-64 w-44 md:w-52">
                <div className="flex items-center justify-center w-full h-1/2 bg-blue-600 rounded-sm mb-6">
                  {c.icon}
                </div>
                <div className="flex flex-col text-center gap-1">
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
