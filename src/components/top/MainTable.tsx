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
    beds: 0, //ベッド
    ventilator: 0, //人工呼吸器
    doctor: 0, //臨床工学技士
    ecmo: 0, //ECMO
    bedDataUpdate: "0000-00-00",
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
    const calcAnswer = Math.floor((ncurrentpatients / bed) * 100);

    return calcAnswer;
  }, []);

  return (
    <Summary>
      <Flex>
        <RightCell>
          <MainTableCell
            title="現在患者数/対策病床数"
            summary={calcPercent(todaysData.ncurrentpatients, todaysData.beds)}
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
          <MainTableCell title={`対策病床数${todaysData.beds}床`} />
        </RightCell>
        <LeftCell>
          <MainTableCell
            title={`PCR検査陽性者数 ${todaysData.npatients.toLocaleString()}人`}
          />
        </LeftCell>
      </Flex>
      <Postscript>
        <div>
          臨床工学技士 {todaysData.doctor}人 / 人工呼吸器
          {todaysData.ventilator}台 / ECMO
          {todaysData.ecmo}台
        </div>
        <div>
          2020年2月回答 出典{" "}
          <LinkUrl href="https://ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/">
            一般社団法人 日本呼吸療法医学会　公益社団法人 日本臨床工学技士会
          </LinkUrl>
        </div>
      </Postscript>
      <Text>
        <div>現在患者数 更新日: {todaysData.lastUpdate}</div>
        <div>対策病床数 発表日:{todaysData.bedDataUpdate}</div>
        <div>
          新型コロナ対策病床数は「
          <LinkUrl href="https://www.mhlw.go.jp/bunya/kenkou/kekkaku-kansenshou15/02-02.html">
            感染症指定医療機関の指定状況
          </LinkUrl>
          」の下記合計と仮定
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
  font-size: 13px;
`;

const LinkUrl = styled.a`
  color: gray;
`;
