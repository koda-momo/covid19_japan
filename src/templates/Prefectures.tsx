import { FC, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageButton } from "../components/layout/PageButton";
import axios from "axios";

//chart.js
import { ChartOptions, ArcElement, Chart, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";
import { LineGraphItem } from "../components/lineGraph/LineGraphItem";
import { PrefecturesReferenceMaterial } from "../components/prefectures/PrefecturesReferenceMaterial";
import { PieChart } from "../components/prefectures/PieChart";
import { PrefectureType } from "../types/PrefectureType";
import { useGetPrefectureData } from "../hooks/useGetPrefectureData";
// import ChartDataLabels from "chartjs-plugin-datalabels";

interface State {
  fullName: string;
}

/**
 * 都道府県別表示ページ.
 */
export const Prefectures: FC = () => {
  Chart.register(ArcElement);
  // Chart.register(ChartDataLabels);

  // トップページから対象都道府県名を受け取るためのlocation
  const location = useLocation();
  const { fullName } = location.state as State;
  console.log(fullName);

  //折れ線グラフ人数ラベル(y軸)
  const [ncurrentpatientsData, setNcurrentpatientsData] = useState<
    Array<number>
  >([]);

  //折れ線グラフ日付ラベル(x軸)
  const [dateData, setDateData] = useState<Array<string>>([]);

  //都道府県データ
  const [prefectureData, setPrefectureData] = useState<Array<PrefectureType>>(
    []
  );

  //都道府県データの取得
  const { getPrefectureData } = useGetPrefectureData();

  //折れ線グラフデータ
  const lineData: ChartData<"line"> = {
    labels: dateData, //日付(x軸)
    datasets: [
      {
        label: "現在入院治療を要する者",
        data: ncurrentpatientsData, //人数(y軸)
        backgroundColor: "#5050CD",
        yAxisID: "ncurrentpatients", //複数データを使用する際はIDを付与
      },
    ],
  };

  //折れ線グラフoptions
  const [lineOptions] = useState<ChartOptions<"line">>({
    scales: {
      y: {
        display: true,
        position: "right",
        title: {
          display: true,
          text: "累計死亡者数",
        },
      },
      ncurrentpatients: {
        display: true,
        position: "left",
        title: {
          display: true,
          text: "現在入院治療を要する者",
        },
      },
    },
  });

  useEffect(() => {
    getPrefectureData(
      fullName,
      setDateData,
      setNcurrentpatientsData,
      setPrefectureData
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageButton />
      {/* <PieChart /> */}
      <PrefecturesReferenceMaterial />
      <LineGraphItem data={lineData} options={lineOptions} title="" />
    </>
  );
};
