import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { Chart as ChartJS, ChartData, Point } from 'chart.js';

const salesData = [
    { day: '01/06', sales: 120 }, { day: '02/06', sales: 125 }, { day: '03/06', sales: 130 },
    { day: '04/06', sales: 128 }, { day: '05/06', sales: 135 }, { day: '06/06', sales: 140 },
    { day: '07/06', sales: 138 }, { day: '08/06', sales: 75 },  { day: '09/06', sales: 145 },
    { day: '10/06', sales: 150 }, { day: '11/06', sales: 148 }, { day: '12/06', sales: 155 }
];
const ANOMALY_INDEX = 7;

const AnomalyChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<ChartJS<'line'> | null>(null);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [isAnalyzed, setIsAnalyzed] = useState(false);

    const createChart = useCallback(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;
        
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const data: ChartData<'line', (number | Point | null)[], unknown> = {
            labels: salesData.map(d => d.day),
            datasets: [{
                label: 'Doanh số (triệu VNĐ)',
                data: salesData.map(d => d.sales),
                borderColor: '#00F6FF', // accent
                backgroundColor: 'rgba(0, 246, 255, 0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#00F6FF',
                pointBorderColor: '#00F6FF',
                pointHoverRadius: 6,
            }]
        };

        chartInstance.current = new (window as any).Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { 
                    y: { 
                        beginAtZero: false, 
                        title: { display: true, text: 'Doanh số (triệu VNĐ)', color: '#8A93A3' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#8A93A3' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#8A93A3' }
                    }
                },
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#10141F',
                        titleColor: '#EAEBEE',
                        bodyColor: '#8A93A3',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                    }
                }
            }
        });
    }, []);

    useEffect(() => {
        createChart();
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [createChart]);

    const handleAnalyze = () => {
        if (!chartInstance.current) return;
        setIsAnalyzed(true);

        const dataset = chartInstance.current.data.datasets[0];
        const pointColors = Array(salesData.length).fill('#00F6FF');
        pointColors[ANOMALY_INDEX] = '#F43F5E'; // rose-500
        
        const pointRadii = Array(salesData.length).fill(4);
        pointRadii[ANOMALY_INDEX] = 8;
        
        const pointBorderColors = Array(salesData.length).fill('#00F6FF');
        pointBorderColors[ANOMALY_INDEX] = '#F43F5E';

        dataset.pointBackgroundColor = pointColors;
        dataset.pointBorderColor = pointBorderColors;
        dataset.pointRadius = pointRadii;

        chartInstance.current.update();

        const anomaly = salesData[ANOMALY_INDEX];
        setAnalysisResult(`<strong>Phát hiện bất thường:</strong> Doanh số ngày <strong>${anomaly.day}</strong> giảm đột ngột xuống <strong>${anomaly.sales} triệu</strong>. <br><strong>Đề xuất:</strong> Kiểm tra các yếu tố có thể ảnh hưởng (VD: chương trình khuyến mãi đối thủ, sự cố hệ thống,...).`);
    };

    return (
        <div className="bg-secondary/80 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold font-heading text-text-primary mb-2">Trình Phát Hiện Bất Thường Dữ Liệu</h3>
            <p className="text-text-secondary mb-6 text-sm">AI phân tích dữ liệu để tìm ra các điểm bất thường. (Dùng dữ liệu mẫu).</p>
            <div className="relative w-full h-48 mb-6">
                <canvas ref={chartRef}></canvas>
            </div>
            <button 
                onClick={handleAnalyze} 
                disabled={isAnalyzed}
                className="bg-accent text-primary py-3 px-6 rounded-md font-semibold hover:bg-accent-dark transition-colors w-full flex items-center justify-center disabled:bg-text-secondary disabled:cursor-not-allowed">
                ✨ Phân tích Dữ liệu
            </button>
            {analysisResult && (
                <div className="mt-4">
                    <h4 className="font-semibold text-sm text-text-secondary">Phân tích:</h4>
                    <div className="bg-primary/50 border-l-4 border-accent p-4 rounded-r-md mt-2 whitespace-pre-wrap font-sans text-sm text-text-primary" dangerouslySetInnerHTML={{ __html: analysisResult }}></div>
                </div>
            )}
        </div>
    );
};

export default AnomalyChart;