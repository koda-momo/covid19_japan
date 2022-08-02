import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";
import { PrefecturesType } from "../types/PrefectureType";

export const useGetAllPrefectureData = () => {
  /**
   * 都道府県全体のデータを取得.
   */
  const getAllPrefectureData = useCallback(
    async (setPrefecturesName: Dispatch<SetStateAction<PrefecturesType[]>>) => {
      //病床数の取得
      const response1 = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan_beds/latest.json"
      );

      //その他データの取得(長期)
      const response2 = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan-all.json"
      );

      const data1 = await response1.data;
      const data2 = await response2.data;
      const array = new Array<PrefecturesType>();

      //最新のデータが入っている配列の箱番号
      const TODAY_NUM = data2.length - 1;

      //最新の前日のデータが入っている配列の箱番号
      const YESTERDAY_NUM = data2.length - 2;

      const todayData = data2[TODAY_NUM].area;
      const yesterdayData = data2[YESTERDAY_NUM].area;

      //47都道府県分回してpush
      for (let i = 0; i < 47; i++) {
        //病床数
        const bedCalc =
          Number(data1[i].入院患者受入確保病床) +
          Number(data1[i].宿泊施設受入可能室数);

        //都道府県名(もし県を含んでいたら削る)
        const name = data1[i].都道府県名;
        let replaceName = name;

        //昨日より増えているか否か
        const upDown =
          yesterdayData[i].ncurrentpatients <= todayData[i].ncurrentpatients
            ? "up"
            : "down";

        if (name.match(/県/)) {
          replaceName = name.replace("県", "");
        } else if (name.match(/都/)) {
          replaceName = name.replace("都", "");
        } else if (name.match(/府/)) {
          replaceName = name.replace("府", "");
        }

        array.push({
          prefectureNumber: data2[i].都道府県番号,
          prefectureName: replaceName,
          bed: bedCalc,
          patients: todayData[i].ncurrentpatients,
          upDown: upDown,
          fullName: todayData[i].name, //フルネーム(ローマ字)
        });
      }

      setPrefecturesName(array);
    },
    []
  );

  return { getAllPrefectureData };
};
