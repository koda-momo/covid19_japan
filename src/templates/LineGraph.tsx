import { FC, memo, useEffect, useState } from "react";
import { PageButton } from "../components/layout/PageButton";
import { LineGraphItem } from "../components/lineGraph/LineGraphItem";
import { ChartOptions, ChartData } from "chart.js";
import { useGetLineGraphData } from "../hooks/useGetLineGraphData";

/**
 * 折れ線グラフ表示ページ.
 */
export const LineGraph: FC = memo(() => {
  //患者ラベル(y軸)
  const [ncurrentpatientsData, setNcurrentpatientsData] = useState<
    Array<number>
  >([]);

  //緊急搬送ラベル(y軸)
  const [emergencyData, setEmergencyData] = useState<Array<null | number>>([]);

  //日付ラベル(x軸)
  const [dateData, setDateData] = useState<Array<string>>([]);

  //折れ線グラフデータの取得
  const { getLineGraphData } = useGetLineGraphData();

  useEffect(() => {
    getLineGraphData(setDateData, setEmergencyData, setNcurrentpatientsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data: ChartData<"line"> = {
    labels: dateData, //日付(x軸)
    datasets: [
      {
        label: "入院治療を要する者",
        data: ncurrentpatientsData, //人数(y軸)
        backgroundColor: "#5050CD",
        yAxisID: "ncurrentpatients", //複数データを使用する際はIDを付与
      },
      {
        label: "救急搬送困難事案数",
        data: emergencyData, //人数(y軸)
        backgroundColor: "red",
        yAxisID: "emergency", //複数データを使用する際はIDを付与
      },
    ],
  };

  // options
  const options: ChartOptions<"line"> = {
    scales: {
      ncurrentpatients: {
        display: true,
        position: "right",
        title: {
          display: true,
          text: "現在入院治療を要する者",
        },
      },
      emergency: {
        display: true,
        position: "left",
        title: {
          display: true,
          text: "救急搬送困難事例数",
        },
      },
    },
  };

  return (
    <>
      <PageButton />
      <LineGraphItem
        data={data}
        options={options}
        title="COVID-19 日本の新型コロナウイルス概要"
      />
    </>
  );
});
