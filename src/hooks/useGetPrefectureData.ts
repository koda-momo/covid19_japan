import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";
import { PrefectureType } from "../types/PrefectureType";

export const useGetPrefectureData = () => {
  /**
   * 都道府県データの取得.
   */
  const getPrefectureData = useCallback(
    async (
      fullName: string,
      setDateData: Dispatch<SetStateAction<string[]>>, //日付配列
      setNcurrentpatientsData: Dispatch<SetStateAction<number[]>>, //入院患者数配列
      setPrefectureData: Dispatch<SetStateAction<PrefectureType[]>> //都道府県データ配列
    ) => {
      const response = await axios.get(
        `https://www.stopcovid19.jp/data/covid19japan/pref/${fullName}.csv`
      );
      const csv = response.data;

      //キーの配列を作成
      const csvArray = csv.replace(/\"/g, "").split(",");
      const HEDERS_LENGTH = 7; //項目名は8個

      const obj = new Array<PrefectureType>();

      //バリューと組み合わせてオブジェクト型にする
      for (let i = 1; i < csvArray.length / 8; i++) {
        const count = i * (HEDERS_LENGTH + 1);
        //日付は余計な文字を省く
        const date = csvArray[count].split(/\n/)[1];

        obj.push({
          date: date, //8の倍数
          npatients: Number(csvArray[count + 1]),
          ncurrentpatients: Number(csvArray[count + 2]),
          nexits: Number(csvArray[count + 3]),
          ndeaths: Number(csvArray[count + 4]),
          nheavycurrentpatients: Number(csvArray[count + 5]),
          nunknowns: Number(csvArray[count + 6]),
          ninspections: Number(csvArray[count + 7]),
        });
      }

      //折れ線グラフ用データ作成
      const ncurrentpatientsArray = new Array<number>();
      const dateArray = new Array<string>();

      for (const item of obj) {
        ncurrentpatientsArray.push(item.ncurrentpatients);
        dateArray.push(item.date);
      }

      setDateData(dateArray);
      setNcurrentpatientsData(ncurrentpatientsArray);
      setPrefectureData(obj);
    },
    []
  );

  return { getPrefectureData };
};
