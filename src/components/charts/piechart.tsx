import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import CardSkeleton from "../skeleton/skeleton.chart";
import { ChartData } from "../../types/types";
Chart.register(...registerables);
interface Props {
  title: string;
  data: ChartData|null;
}

export default function PieChart({ data, title }: Props) {
  useEffect(() => {
    const config = {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    };
    const chart = new Chart(canvaRef.current!, config as any);
    return () => {
      chart.destroy();
    };
  }, [data]);
  const canvasHeight = 300;
  const canvaRef = useRef<HTMLCanvasElement | null>(null);
  
  return (
    <div className="card">
      {!data && <CardSkeleton centerTitle={true} />}
      {data && (
        <div className="card-header">
          <h6 className="mb-0 text-center text-capitalize">{title}</h6>
        </div>
      )}
      <div className="card-body">
        <canvas height={canvasHeight} ref={canvaRef} />
      </div>
    </div>
  );
}
