import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";
import { PrefecturesType } from "../types/PrefectureType";

export const useGetAllPrefectureData = () => {
  /**
   * 都道府県全体のデータを取得.
   */
  const getAllPrefectureData = useCallback(
    async (setPrefecturesName: Dispatch<SetStateAction<PrefecturesType[]>>) => {
      const response1 = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan.json"
      );

      const response2 = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan_beds/latest.json"
      );

      const data1 = await response1.data.area;
      const data2 = await response2.data;
      const array = new Array<PrefecturesType>();

      //47都道府県分回してpush
      for (let i = 0; i < 47; i++) {
        //病床数
        const bedCalc =
          Number(data2[i].入院患者受入確保病床) +
          Number(data2[i].宿泊施設受入可能室数);

        //都道府県名(もし県を含んでいたら削る)
        const name = data2[i].都道府県名;
        let replaceName = name;

        if (name.match(/県/)) {
          replaceName = name.replace("県", "");
        } else if (name.match(/都/)) {
          replaceName = name.replace("都", "");
        } else if (name.match(/府/)) {
          replaceName = name.replace("府", "");
        }

        array.push({
          prefectureNumber: Number(data2[i].都道府県番号),
          prefectureName: replaceName,
          bed: bedCalc,
          patients: data1[i].ncurrentpatients,
        });
      }

      setPrefecturesName(array);
    },
    []
  );

  return { getAllPrefectureData };
};
