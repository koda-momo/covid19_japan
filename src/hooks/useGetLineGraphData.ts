import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";

export const useGetLineGraphData = () => {
  /**
   * 折れ線グラフ用データの取得.
   */
  const getLineGraphData = useCallback(
    async (
      setDateData: Dispatch<SetStateAction<string[]>>,
      setEmergencyData: Dispatch<SetStateAction<Array<null | number>>>,
      setNcurrentpatientsData: Dispatch<SetStateAction<number[]>>
    ) => {
      const response1 = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan-all.json"
      );

      const response2 = await axios.get(
        "https://code4fukui.github.io/fdma_go_jp/emergencytransport_difficult_all.csv"
      );

      const csv = response2.data.replace(/\n/g, ",");
      const data2 = csv.replace(/"/g, "").split(",");

      //緊急搬送データ作成
      const emergencyArray = new Array<null | number>();
      //数字の入っている部分が20,23,26...箱目
      for (let i = 20; i < data2.length; i = i + 3) {
        emergencyArray.push(Number(data2[i]));
        //データがない日付分は空ける(6日間)
        for (let j = 1; j <= 6; j++) {
          emergencyArray.push(null);
        }
      }

      //患者数推移データ作成
      const data1 = response1.data;
      const ncurrentpatientsArray = new Array<number>();
      const dateArray = new Array<string>();

      //5月10日のデータから開始
      for (let i = 53; i < data1.length; i++) {
        dateArray.push(data1[i].lastUpdate);
        ncurrentpatientsArray.push(Number(data1[i].ncurrentpatients));
      }

      setDateData(dateArray);
      setEmergencyData(emergencyArray);
      setNcurrentpatientsData(ncurrentpatientsArray);
    },
    []
  );

  return { getLineGraphData };
};
