import { useCoinGecko } from '@utils/hooks/useCoingecko'
import { ActivityData, TokenData } from '@utils/types/nft.interface'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { ChartOptions, ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'


// 라이브러리 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const Chart2 = ({ token, activity }: { token: TokenData, activity: ActivityData[] }) => {
  const priceArray = activity.map((item) => item.krwPrice)
  const dateArray = activity.map((item) => item.createdAt.slice(0, 10).split("-").reverse().join("-"))

  // Chart Data //
  const chartData = {
        labels: dateArray, // X축
        datasets: [
            {
                label: 'NFT Trading Chart',
                data: priceArray,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.4)', // hover시 나오는 background Color
                borderColor: 'rgba(75, 192, 192, 1)', //
            },
        ],
    }
   // Chart Data //

   // Chart Options //
  const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // 반응형
        layout: {
            padding: {
                top: 10,
                bottom: 10,
            },
        },
        elements: {
            point: {
                radius: 5, // 데이터 포인트 크기 변경 (0으로 설정하여 숨김)
            },
        },
        plugins: {
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
                    font: {
                        size: 18, // 범례 텍스트 크기 변경
                        weight: 'bold', // 범례 텍스트 굵기 변경
                    },
                },
            },
            //
        },
        // plugins end
    }
    // Chart Options //

    // Chart Size //
  const chartContainerStyle = {
        height: '15rem', // 원하는 높이로 조정
    }
    // Chart Size //


    return (
        <div style={chartContainerStyle}>
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}
