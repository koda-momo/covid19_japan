import { FC, memo, useEffect, useState } from "react";
import { PrefecturesCell } from "./PrefecturesCell";

import styled from "styled-components";
import { PrefecturesType } from "../../types/PrefectureType";
import { useGetAllPrefectureData } from "../../hooks/useGetAllPrefectureData";
import { useGetTodaysData } from "../../hooks/useGetTodaysData";

/**
 * 都道府県別テーブル.
 */
export const PrefecturesTable: FC = memo(() => {
  const { getAllPrefectureData } = useGetAllPrefectureData();
  const { getNcurrentpatients } = useGetTodaysData();

  //都道府県データ配列
  const [prefecturesName, setPrefecturesName] = useState<
    Array<PrefecturesType>
  >([]);

  //全国現在の患者数
  const [ncurrentpatients, setNcurrentpatients] = useState<number>(0);

  /**
   * 初期データの取得.
   */
  useEffect(() => {
    getAllPrefectureData(setPrefecturesName);
    getNcurrentpatients(setNcurrentpatients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <All colSpan={2}>
              <div>{ncurrentpatients.toLocaleString()} / 112,445</div>
              <SmallFont>(全国) 現在患者数 / 対策病床数</SmallFont>
            </All>
            {prefecturesName.slice(0, 5).map((item) => (
              <Td key={item.prefectureNumber}>
                <PrefecturesCell
                  upDown={item.upDown}
                  name={item.prefectureName}
                  bed={item.bed}
                  patients={item.patients}
                />
              </Td>
            ))}
          </tr>
          <tr>
            {prefecturesName.slice(5, 12).map((item) => (
              <Td key={item.prefectureNumber}>
                <PrefecturesCell
                  upDown={item.upDown}
                  name={item.prefectureName}
                  bed={item.bed}
                  patients={item.patients}
                />
              </Td>
            ))}
          </tr>
          <tr>
            {prefecturesName.slice(12, 19).map((item) => (
              <Td key={item.prefectureNumber}>
                <PrefecturesCell
                  upDown={item.upDown}
                  name={item.prefectureName}
                  bed={item.bed}
                  patients={item.patients}
                />
              </Td>
            ))}
          </tr>
          <tr>
            {prefecturesName.slice(19, 26).map((item) => (
              <Td key={item.prefectureNumber}>
                <PrefecturesCell
                  upDown={item.upDown}
                  name={item.prefectureName}
                  bed={item.bed}
                  patients={item.patients}
                />
              </Td>
            ))}
          </tr>
          <tr>
            {prefecturesName.slice(26, 33).map((item) => (
              <Td key={item.prefectureNumber}>
                <PrefecturesCell
                  upDown={item.upDown}
                  name={item.prefectureName}
                  bed={item.bed}
                  patients={item.patients}
                />
              </Td>
            ))}
          </tr>
          <tr>
            {prefecturesName.slice(33, 40).map((item) => (
              <Td key={item.prefectureNumber}>
                <PrefecturesCell
                  upDown={item.upDown}
                  name={item.prefectureName}
                  bed={item.bed}
                  patients={item.patients}
                />
              </Td>
            ))}
          </tr>
          <tr>
            {prefecturesName.slice(40, 47).map((item) => (
              <Td key={item.prefectureNumber}>
                <PrefecturesCell
                  upDown={item.upDown}
                  name={item.prefectureName}
                  bed={item.bed}
                  patients={item.patients}
                />
              </Td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
});

const All = styled.td`
  background-color: black;
  color: white;
  height: 20px;
  text-align: center;
`;

const SmallFont = styled.div`
  font-size: 12px;
`;

const Td = styled.td`
  height: 20px;
  width: 100px;
`;
