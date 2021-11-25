import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
/**
 * 
 * @param {Object.<string,any>} data - chart data
 * @example  const data = {
         labels: ["1st years", "2nd years", "3rd years", "4th years", "others"],
         datasets: [
            {
            data: [14, 10, 5, 2, 20],
             backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.5)",
              "rgba(0,123,255,0.3)",
            ],
        },
    ],}; 
 * @param {string} title - chat title
 * @returns 
 */
export default function PieChart({ data, title }) {
    console.log(JSON.stringify(data))
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
    const chart = new Chart(canvaRef.current, config);
    return () => {
      chart.destroy();
    };
  }, [data]);
  const canvasHeight = 300;
  const canvaRef = useRef();
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0 text-center text-capitalize">{title}</h6>
      </div>
      <div className="card-body">
        <canvas height={canvasHeight} ref={canvaRef} />
      </div>
    </div>
  );
}
