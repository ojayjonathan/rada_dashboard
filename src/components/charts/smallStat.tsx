import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { Chart, registerables } from "chart.js";
import "./index.css";
import { ChartData } from "../../types/types";
Chart.register(...registerables);

interface Props {
  value: string;
  data?: ChartData;
  label: string;
}
function SmallStats({ label, value, data }: Props) {
  let percentageClasses;
  let percentage;

  if (data != null) {
    const datasets = data.datasets[0].data;
    const increase =
      +datasets[datasets.length - 1] - +datasets[datasets.length - 2];
    percentage = `${(increase / +datasets[datasets.length - 2]) * 100}`;
    percentageClasses = classNames(
      "stats-small__percentage",
      `stats-small__percentage--${increase > 0 ? "increase" : "decrease"}`
    );
  }
  useEffect(() => {
    if (data == null) return;
    const config = {
      type: "line",
      data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
          custom: false,
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0.33,
          },
        },
        scales: {
          x: {
            gridLines: false,
            scaleLabel: false,
            ticks: {
              display: false,
              isplay: false,
            },
            grid: {
              display: false,
              drawBorder: false,
              drawOnChartArea: true,
              drawTicks: false,
            },
          },
          y: {
            gridLines: false,
            scaleLabel: false,
            ticks: {
              display: false,
              isplay: false,
            },
            grid: {
              display: false,
              drawBorder: false,
              drawOnChartArea: true,
              drawTicks: false,
            },
          },
        },
      },
    };
    const chart = new Chart(canvaRef.current!, config as any);
    return () => {
      chart.destroy();
    };
  }, [data]);

  const canvaRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <div className="card stats-small stats-small--1">
      <div className="card-body p-0 d-flex">
        <div className="d-flex flex-column m-auto">
          <div className="stats-small__data text-center">
            <span className="stats-small__label text-uppercase">{label}</span>
            <h6 className="stats-small__value my-3 count">{value}</h6>
          </div>
          <div className="stats-small__data">
            <span className={percentageClasses}>{percentage}</span>
          </div>
        </div>
        <canvas ref={canvaRef} />
      </div>
    </div>
  );
}

export default SmallStats;
