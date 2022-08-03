import { FC } from "react";
import styled from "styled-components";
import { PageButton } from "../components/layout/PageButton";
import { MainTable } from "../components/top/MainTable";
import { PrefecturesTable } from "../components/top/PrefecturesTable";

/**
 * Top表示ページ.
 */
export const Top: FC = () => {
  return (
    <Main>
      <PageButton />
      <Flex>
        <MainTableSize>
          <MainTable />
        </MainTableSize>

        <PrefecturesTableSize>
          <PrefecturesTable />
        </PrefecturesTableSize>
      </Flex>
      <Text>
        <div>
          新型コロナウイルス感染症（国内事例） 現在患者数 / 対策病床数
          ※軽症者等は自宅療養など、病床を使用しないことがあります（
          <LinkUrl href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html">
            詳細
          </LinkUrl>
          ）
        </div>
        <Flex>
          （現在患者数
          <UpIcon>
            <img src="/img/trendarrow01.svg" alt="up" />
          </UpIcon>
          前日より増加
          <DownIcon>
            <img src="/img/trendarrow03.svg" alt="down" />
          </DownIcon>
          前日より減少）
        </Flex>
      </Text>
    </Main>
  );
};

// 全体100 左右10　真ん中2 メイン39 都道府県49
const Main = styled.div`
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  gap: 2%;
  justify-content: center;
`;

const MainTableSize = styled.div`
  width: 39%;
  display: flex;
  justify-content: center;
`;

const PrefecturesTableSize = styled.div`
  width: 49%;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
`;

const LinkUrl = styled.a`
  color: gray;
`;

const UpIcon = styled.div`
  width: 15px;
  margin-left: -20px;
  margin-right: -20px;
`;

const DownIcon = styled.div`
  width: 15px;
  margin-left: -20px;
  margin-right: -20px;
  transform: scale(1, -1);
`;
