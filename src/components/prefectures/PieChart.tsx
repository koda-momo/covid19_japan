import { FC, memo, useEffect, useState } from "react";
import axios from "axios";

//chart.js
import { ChartOptions, ArcElement, Chart, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useGetPrefectureData } from "../../hooks/useGetPrefectureData";
// import ChartDataLabels from "chartjs-plugin-datalabels";

type Props = {
  ncurrentpatients: number; //現在患者数
  fullName: string; //都道府県名
};

/**
 *
 */
export const PieChart: FC<Props> = memo(({ ncurrentpatients, fullName }) => {
  Chart.register(ArcElement);
  // Chart.register(ChartDataLabels);

  //ベッドの%
  const [bedPercent, setBedPercent] = useState(0);

  const { getPieData, pieBedData } = useGetPrefectureData();

  useEffect(() => {
    getPieData(fullName);

    //percentの計算
    const calcPercent = Math.round((ncurrentpatients / pieBedData) * 100);
    //入院患者のpercentが100以上なら0を代入
    const calcBedPercent = 100 - calcPercent <= 0 ? 0 : 100 - calcPercent;
    setBedPercent(calcBedPercent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //円グラフデータ
  const pieData: ChartData<"pie"> = {
    labels: [
      `現在患者数${ncurrentpatients}`,
      `想定病床残数${pieBedData - ncurrentpatients}`,
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

  console.dir(JSON.stringify(ncurrentpatients));
  console.dir(JSON.stringify(pieBedData));

  return (
    <>
      <Pie data={pieData} options={chartOptions} />
    </>
  );
});
