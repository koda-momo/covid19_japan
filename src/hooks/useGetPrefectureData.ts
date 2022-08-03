import { Dispatch, SetStateAction, useCallback, useState } from "react";
import axios from "axios";
import { PrefectureTextType, PrefectureType } from "../types/PrefectureType";
import { ChartData } from "chart.js";
import { format } from "date-fns";

export const useGetPrefectureData = () => {
  //折れ線グラフ現在患者ラベル(y軸)
  const [ncurrentpatientsData, setNcurrentpatientsData] = useState<
    Array<number>
  >([]);

  //折れ線グラフ死亡者数ラベル(ｙ軸)
  const [ndeathsArray, setNdeathsArray] = useState<Array<number>>([]);

  //折れ線グラフ日付ラベル(x軸)
  const [dateData, setDateData] = useState<Array<string>>([]);

  //円グラフ床データ
  const [pieBedData, setPieBedData] = useState(0);

  /**
   * 都道府県折れ線グラフデータの取得.
   */
  const getPrefectureData = useCallback(
    async (
      romaji: string,
      setPrefectureData: Dispatch<SetStateAction<PrefectureType>> //都道府県データ配列
    ) => {
      const response = await axios.get(
        `https://www.stopcovid19.jp/data/covid19japan/pref/${romaji}.csv`
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
          ncurrentpatients: Number(csvArray[count + 2]), //現在患者数
          nexits: Number(csvArray[count + 3]),
          ndeaths: Number(csvArray[count + 4]), //死亡者数
          nheavycurrentpatients: Number(csvArray[count + 5]),
          nunknowns: Number(csvArray[count + 6]),
          ninspections: Number(csvArray[count + 7]),
        });
      }

      //折れ線グラフ用データ作成
      const dateArray = new Array<string>(); //日付
      const ncurrentpatientsArray = new Array<number>(); //現在患者数
      const ndeathsArray = new Array<number>(); //死亡者数

      for (const item of obj) {
        dateArray.push(item.date);
        ncurrentpatientsArray.push(item.ncurrentpatients);
        ndeathsArray.push(item.ndeaths);
      }

      setDateData(dateArray);
      setNcurrentpatientsData(ncurrentpatientsArray);
      setNdeathsArray(ndeathsArray);
      setPrefectureData(obj[obj.length - 2]);
    },
    []
  );

  //折れ線グラフデータ
  const lineData: ChartData<"line"> = {
    labels: dateData, //日付(x軸)
    datasets: [
      {
        label: "入院治療を要する者",
        data: ncurrentpatientsData, //人数(y軸)
        backgroundColor: "#5050CD",
        yAxisID: "ncurrentpatients", //複数データを使用する際はIDを付与
      },
      {
        label: "累計死亡者数",
        data: ndeathsArray, //人数(y軸)
        backgroundColor: "black",
        yAxisID: "ndeaths", //複数データを使用する際はIDを付与
      },
    ],
  };

  /**
   * 都道府県円グラフデータの取得.
   */
  const getPieData = useCallback(
    async (
      fullName: string,
      setHospitalBeds: Dispatch<SetStateAction<number>>,
      setHotelsBeds: Dispatch<SetStateAction<number>>
    ) => {
      const reponse = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan_beds/latest.json"
      );

      const data = reponse.data.find((item: any) => {
        return item.都道府県名 === fullName;
      });

      const hospitalBeds = Number(data.入院患者受入確保病床);
      const hotelsBeds = Number(data.宿泊施設受入可能室数);

      setPieBedData(hospitalBeds + hotelsBeds);
      setHospitalBeds(hospitalBeds);
      setHotelsBeds(hotelsBeds);
    },
    []
  );

  /**
   * テキストデータ取得.
   */
  const getPrefectureTextData = useCallback(
    async (
      fullName: string,
      setTextData: Dispatch<SetStateAction<PrefectureTextType>>
    ) => {
      const response = await axios.get(
        "https://www.stopcovid19.jp/data/ventilator-20200306.csv"
      );

      //レスポンスの更新日
      const daupdateDate = new Date(response.headers["last-modified"]);
      const date = format(daupdateDate, "yyyy-MM-dd");

      //csvファイルをJSON形式に変換
      const csv = response.data.replace(/\n/g, ",");
      const data = csv.replace(/\"/g, "").split(",");

      const indexNumber = data.indexOf(fullName);

      const textData: PrefectureTextType = {
        ventilator:
          Number(data[indexNumber + 10]) + Number(data[indexNumber + 12]),
        doctor: Number(data[indexNumber + 6]),
        ecmo: Number(data[indexNumber + 12]),
        bedDataUpdate: date,
      };

      setTextData(textData);
    },
    []
  );

  return {
    getPrefectureData,
    lineData,
    getPieData,
    pieBedData,
    getPrefectureTextData,
  };
};
