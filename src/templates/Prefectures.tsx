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
import styled from "styled-components";
// import ChartDataLabels from "chartjs-plugin-datalabels";

interface State {
  romaji: string;
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
  const { romaji, fullName } = location.state as State;

  //都道府県データ
  const [prefectureData, setPrefectureData] = useState<PrefectureType>({
    date: "",
    npatients: 0,
    ncurrentpatients: 0,
    nexits: 0,
    ndeaths: 0,
    nheavycurrentpatients: 0,
    nunknowns: 0,
    ninspections: 0,
  });

  //都道府県データの取得
  const { getPrefectureData, lineData } = useGetPrefectureData();

  //折れ線グラフoptions
  const [lineOptions] = useState<ChartOptions<"line">>({
    scales: {
      ndeaths: {
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
    getPrefectureData(romaji, setPrefectureData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Main>
        <PageButton />
        <PieGraph>
          <PieChart
            ncurrentpatients={prefectureData.ncurrentpatients}
            fullName={fullName}
          />
        </PieGraph>

        <PrefecturesReferenceMaterial />

        <LineGraph>
          <LineGraphItem data={lineData} options={lineOptions} title="" />
        </LineGraph>
      </Main>
    </>
  );
};

const Main = styled.div`
  width: 100%;
`;

const PieGraph = styled.div`
  width: 30%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const LineGraph = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 50px;
`;
