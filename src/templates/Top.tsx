import { FC } from "react";
import styled from "styled-components";
import { MainTable } from "../components/top/MainTable";
import { PrefecturesTable } from "../components/top/PrefecturesTable";

/**
 * Top表示ページ.
 */
export const Top: FC = () => {
  return (
    <Main>
      <Flex>
        <MainTableSize>
          <MainTable />
        </MainTableSize>

        <PrefecturesTableSize>
          <PrefecturesTable />
        </PrefecturesTableSize>
      </Flex>
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
