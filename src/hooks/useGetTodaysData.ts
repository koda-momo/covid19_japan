import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";
import { todaysDataType } from "../types/TodaysDataType";
import { format } from "date-fns";

export const useGetTodaysData = () => {
  /**
   * 全国の最新データ取得.
   */
  const getTodaysData = useCallback(
    async (setTodaysData: Dispatch<SetStateAction<todaysDataType>>) => {
      const response1 = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan.json"
      );

      //csvファイルからテーブル下のデータ読み込み
      const response2 = await axios.get(
        "https://www.stopcovid19.jp/data/ventilator-20200306.csv"
      );

      const data1 = response1.data;

      //レスポンス2の更新日
      const bedDate = new Date(response2.headers["last-modified"]);
      const bedDataUpdate = format(bedDate, "yyyy-MM-dd");

      //csvファイルをJSON形式に変換
      const csv = response2.data.replace(/\n/g, ",");
      const data2 = csv.replace(/"/g, "").split(",");

      const item: todaysDataType = {
        ncurrentpatients: Number(data1.ncurrentpatients), //患者数
        nexits: Number(data1.nexits), //累積退院者数
        ndeaths: Number(data1.ndeaths), //死亡者
        npatients: Number(data1.npatients), //PCR陽性
        lastUpdate: data1.lastUpdate, //更新日
        beds: Number(data2[677]), //ベッド
        ventilator: Number(data2[679]) + Number(data2[682]), //人工呼吸器
        doctor: Number(data2[678]), //臨床工学技士
        ecmo: Number(data2[684]), //ECMO
        bedDataUpdate: bedDataUpdate, //床の更新日
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
