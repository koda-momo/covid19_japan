import { FC, useState } from "react";
import { PageButton } from "../components/layout/PageButton";

//chart.js
import { ChartOptions, ArcElement, Chart, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";

/**
 * 都道府県別表示ページ.
 */
export const Prefectures: FC = () => {
  Chart.register(ArcElement);
  // Chart.register(ChartDataLabels);

  // //円グラフのオプション
  // const chartOptions: ChartOptions<"pie"> = {
  //   plugins: {
  //     datalabels: {
  //       labels: {
  //         title: {
  //           color: "white",
  //           font: {
  //             size: 15,
  //           },
  //         },
  //       },
  //       display: true,
  //       formatter(value, context) {
  //         return pieOption(value, context);
  //       },
  //     },
  //   },
  // };

  //円グラフデータ
  const [pieData, setPieData] = useState<ChartData<"pie">>({
    labels: ["現在患者数", "想定病床残数"],
    datasets: [
      {
        label: "鳥取県 現在患者数/対策病床数 564%",
        data: [564],
        backgroundColor: ["red", "gray"],
        hoverOffset: 4,
      },
    ],
  });

  return (
    <>
      <PageButton />
      <Pie data={pieData} />
    </>
  );
};
