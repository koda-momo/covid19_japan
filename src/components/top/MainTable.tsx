import { FC, memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetTodaysData } from "../../hooks/useGetTodaysData";
import { todaysDataType } from "../../types/TodaysDataType";
import { MainTableCell } from "./MainTableCell";

/**
 * メインテーブル.
 */
export const MainTable: FC = memo(() => {
  //最新データ
  const [todaysData, setTodaysData] = useState<todaysDataType>({
    ncurrentpatients: 0,
    nexits: 0,
    ndeaths: 0,
    npatients: 0,
    lastUpdate: "0000-00-00",
  });

  //初期データの取得
  const { getTodaysData } = useGetTodaysData();

  useEffect(() => {
    getTodaysData(setTodaysData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 現在患者数/対策病床数を返すメソッド.
   */

  const calcPercent = useCallback((ncurrentpatients: number, bed: number) => {
    const calcAnswer = Math.round((ncurrentpatients / bed) * 100);

    return calcAnswer;
  }, []);

  return (
    <Summary>
      <Flex>
        <RightCell>
          <MainTableCell
            title="現在患者数/対策病床数"
            summary={calcPercent(todaysData.ncurrentpatients, 112445)}
            unit="%"
          />
        </RightCell>
        <LeftCell>
          <MainTableCell
            title="現在患者数"
            summary={todaysData.ncurrentpatients}
            unit="人"
          />
        </LeftCell>
      </Flex>
      <Flex>
        <RightCell>
          <MainTableCell
            title="累積退院者"
            summary={todaysData.nexits}
            unit="人"
          />
        </RightCell>
        <LeftCell>
          <MainTableCell
            title="死亡者数"
            summary={todaysData.ndeaths}
            unit="人"
          />
        </LeftCell>
      </Flex>
      <Flex>
        <RightCell>
          <MainTableCell title="対策病床数112,445床" />
        </RightCell>
        <LeftCell>
          <MainTableCell
            title={`PCR検査陽性者数 ${todaysData.npatients.toLocaleString()}人`}
          />
        </LeftCell>
      </Flex>
      <Postscript>
        <div>臨床工学技士 14,378人 / 人工呼吸器 28,197台 / ECMO 1,412台</div>
        <div>
          2020年2月回答 出典 一般社団法人 日本呼吸療法医学会　公益社団法人
          日本臨床工学技士会
        </div>
      </Postscript>
      <Text>
        <div>現在患者数 更新日: {todaysData.lastUpdate}</div>
        <div>対策病床数 発表日:2022-07-27</div>
        <div>
          新型コロナ対策病床数は「感染症指定医療機関の指定状況」の下記合計と仮定
        </div>
      </Text>
    </Summary>
  );
});

const Summary = styled.div`
  width: 500px;
`;

const RightCell = styled.div`
  margin-right: -3.5px;
  width: 51%;
`;

const LeftCell = styled.div`
  width: 51%;
`;

const Flex = styled.div`
  display: flex;
`;

const Postscript = styled.div`
  border: 3.5px solid #ad232f;
  padding: 1px;
  text-align: center;
  font-size: 10px;
  margin-top: -3.5px;
`;

const Text = styled.div`
  text-align: center;
`;
