import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";
import { todaysDataType } from "../types/TodaysDataType";

export const useGetTodaysData = () => {
  /**
   * 全国の最新データ取得.
   */
  const getTodaysData = useCallback(
    async (setTodaysData: Dispatch<SetStateAction<todaysDataType>>) => {
      const response = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan.json"
      );

      const data = response.data;
      const item: todaysDataType = {
        ncurrentpatients: Number(data.ncurrentpatients), //患者数
        nexits: Number(data.nexits), //累積退院者数
        ndeaths: Number(data.ndeaths), //死亡者
        npatients: Number(data.npatients), //PCR陽性
        lastUpdate: data.lastUpdate, //更新日
      };

      setTodaysData(item);
    },
    []
  );

  /**
   * 全国の最新患者数だけ取得.
   */
  const getNcurrentpatients = useCallback(
    async (setNcurrentpatients: Dispatch<SetStateAction<number>>) => {
      const response = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan.json"
      );

      const data = await response.data;
      const ncurrentpatients = Number(data.ncurrentpatients); //患者数

      setNcurrentpatients(ncurrentpatients);
    },
    []
  );

  return { getTodaysData, getNcurrentpatients };
};
