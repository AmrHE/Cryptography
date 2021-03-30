import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import { chartOptions } from '../chartConfigs/chartConfigs';

const HistoryChart = ({data}) => {
    const { day, week, year, detail } = data;
    const chartRef = useRef();
    const [chartDuration, setChartDuration] = useState('24h');

    const SelectChartDuration = () => {
        switch(chartDuration) {
            case "24h": 
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    }

    useEffect(() => {
        if(chartRef && chartRef.current && detail) {
            const chartInstance = new Chartjs(chartRef.current, {
                type: 'line',
                data: {
                    datasets: [{
                        label: `${detail.name} price`,
                        data: SelectChartDuration(),
                         backgroundColor: "rgba(174, 305, 194, 0.5)",
                         borderColor: "rgba(174, 305, 194, 1",
                         pointRadius: 0,
                    }]
                },
                options: {
                    ...chartOptions
                }
            });
        }
    });


    const renderPrice = () => {
        if (detail) {
            return(
                <>
                    <p className="my-0">${detail.current_price.toFixed(2)}</p>
                    <p className={
                        detail.price_change_24h < 0 
                        ? "text-danger my-0" 
                        : "text-sucess my-0"
                        }
                    >
                        {detail.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </>
            )
        }
    }
    return (
        <div className="bg-white borer mt-2 rounded p-3">
            <div>{renderPrice()}</div>
            <div>
                <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
            </div>

            <div className="chart-button mt-1">
                <button onClick={() => setChartDuration('24h')} className="btn btn-outline-secondary btn-sm">24h</button>
                <button onClick={() => setChartDuration('7d')} className="btn btn-outline-secondary btn-sm mx-1">7d</button>
                <button onClick={() => setChartDuration('1y')} className="btn btn-outline-secondary btn-sm">1y</button>
            </div>


        </div>
        
    )
}

export default HistoryChart;