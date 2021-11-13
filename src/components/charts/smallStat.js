import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { Chart, registerables } from "chart.js";
import "./index.css"
Chart.register(...registerables);




/**
 * 
 * @param {Object.<string,any>} data - chart data
 * @example const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      backgroundColor: "#f2fbf6",
      borderColor: "#8ae2b7",
      data: [0, 10, 5, 2, 20, 30, 45],
      fill: true,
    },
  ],
};
 * @param {string} label - chat label
 *  @param {Boolean} increase
 * 
 * @returns 
 */
function SmallStats({ label, value, data }) {
  const datasets = data.datasets[0].data
  const increase = datasets[datasets.length - 1] - datasets[datasets.length - 2]
  const percentage = `${increase / datasets[datasets.length - 2] * 100}`
  const percentageClasses = classNames(
    "stats-small__percentage",
    `stats-small__percentage--${increase > 0 ? "increase" : "decrease"}`
  );
  useEffect(() => {
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
    const chart = new Chart(canvaRef.current, config);
    return () => {
      chart.destroy();
    };
  });
  const canvasHeight = 200;
  const canvaRef = useRef();
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
        <canvas  ref={canvaRef} />
      </div>
    </div>
  );
}

export default SmallStats;
