import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {  ChartOptions, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

// 라이브러리 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','December'], // X축
  datasets: [
    {
      label: 'NFT Trading Chart',
      data: [65, 59, 80, 81, 56, 55, 40,120],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.4)', // hover시 나오는 background Color
      borderColor: 'rgba(75, 192, 192, 1)', //
    },
  ],
};

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  elements: {
    point: {
      radius: 5, // 데이터 포인트 크기 변경 (0으로 설정하여 숨김)
    },
  },
  plugins:{
    //
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // 툴팁 배경색 변경
      titleColor: 'white', // 툴팁 제목 텍스트 색상 변경
      bodyColor: 'white', // 툴팁 내용 텍스트 색상 변경
    },
    //
    legend: {
      labels: {
        color: 'green', // 범례 텍스트 색상 변경
        font:{
          size: 18, // 범례 텍스트 크기 변경
          weight: 'bold', // 범례 텍스트 굵기 변경
        }
      },
    },
    //
  },
  // plugins end
}

export const Chart2 = () => {
  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}
