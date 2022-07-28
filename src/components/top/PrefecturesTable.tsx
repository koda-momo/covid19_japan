import { FC, memo, useCallback, useEffect, useState } from "react";
import { PrefecturesCell } from "./PrefecturesCell";
import axios from "axios";

type prefecturesType = { prefectureNumber: number; prefectureName: string };

/**
 *
 */
export const PrefecturesTable: FC = memo(() => {
  const [prefecturesName, setPrefecturesName] = useState<
    Array<prefecturesType>
  >([]);

  const getData = useCallback(async () => {
    const response = await axios.get(
      "https://www.stopcovid19.jp/data/covid19japan_beds/latest.json"
    );

    const data = response.data;
    const array = new Array<prefecturesType>();

    for (const item of data) {
      array.push({
        prefectureNumber: Number(item.都道府県番号),
        prefectureName: item.都道府県名,
      });
    }

    setPrefecturesName(array);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {prefecturesName.map((item) => (
        <PrefecturesCell
          key={item.prefectureNumber}
          name={item.prefectureName}
        />
      ))}
    </>
  );
});
