import { FC, memo, useCallback, useEffect, useState } from "react";
import { Scatter, Line } from "react-chartjs-2";
import { Chart, registerables, ChartOptions, ChartData } from "chart.js";
import axios from "axios";
import styled from "styled-components";

/**
 *
 */
export const LineGraphItem: FC = memo(() => {
  Chart.register(...registerables);

  //人数ラベル(y軸)
  const [ncurrentpatientsData, setNcurrentpatientsData] = useState<
    Array<number>
  >([]);

  //日付ラベル(x軸)
  const [dateData, setDateData] = useState<Array<string>>([]);

  /**
   * 折れ線グラフ用データの取得.
   */
  const getData = useCallback(async () => {
    const response = await axios.get(
      "https://www.stopcovid19.jp/data/covid19japan-all.json"
    );
    const data = response.data;
    const ncurrentpatientsArray = new Array<number>();
    const dateArray = new Array<string>();

    for (const item of data) {
      dateArray.push(item.lastUpdate);
      ncurrentpatientsArray.push(Number(item.ncurrentpatients));
    }

    setDateData(dateArray);
    setNcurrentpatientsData(ncurrentpatientsArray);
  }, []);

  useEffect(() => {
    getData();
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
    ],
  };

  // const options: any = {
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
      y: {
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
      <Title>COVID-19 日本の新型コロナウイルス概要</Title>

      <Line data={data} options={options} />
    </>
  );
});

const Title = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: gray;
`;
