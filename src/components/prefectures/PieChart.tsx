import { FC, memo } from "react";

//chart.js
import { ChartOptions, ArcElement, Chart, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

type Props = {
  ncurrentpatients: number; //現在患者数
  pieBedData: number; //床数
  bedPercent: number; //残り床%
  fullName: string;
};

/**
 *
 */
export const PieChart: FC<Props> = memo(
  ({ ncurrentpatients, pieBedData, bedPercent, fullName }) => {
    Chart.register(ArcElement);

    //円グラフデータ
    const pieData: ChartData<"pie"> = {
      labels: [
        `現在患者数(${ncurrentpatients})`,
        `想定病床残数(${pieBedData - ncurrentpatients})`,
      ],
      datasets: [
        {
          label: "円グラフ",
          data: [ncurrentpatients, bedPercent],
          backgroundColor: ["red", "gray"],
          hoverOffset: 4,
        },
      ],
    };

    //円グラフのオプション
    const chartOptions: ChartOptions<"pie"> = {
      plugins: {
        title: {
          display: true,
          text: `${fullName} 現在患者数/対策病床数 ${Math.round(
            (ncurrentpatients / pieBedData) * 100
          )}%`,
        },
      },
    };

    return (
      <>
        <Pie data={pieData} options={chartOptions} />
      </>
    );
  }
);
