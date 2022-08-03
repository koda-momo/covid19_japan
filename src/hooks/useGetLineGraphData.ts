import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";

export const useGetLineGraphData = () => {
  /**
   * 折れ線グラフ用データの取得.
   */
  const getLineGraphData = useCallback(
    async (
      setDateData: Dispatch<SetStateAction<string[]>>,
      setNcurrentpatientsData: Dispatch<SetStateAction<number[]>>
    ) => {
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
    },
    []
  );

  return { getLineGraphData };
};
