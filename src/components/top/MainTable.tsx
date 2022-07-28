import { FC, memo } from "react";
import styled from "styled-components";
import { MainTableCell } from "./MainTableCell";

/**
 *
 */
export const MainTable: FC = memo(() => {
  return (
    <Summary>
      <Flex>
        <MainTableCell title="現在患者数/対策病床数" summary="1,106" unit="%" />
        <MainTableCell title="現在患者数" summary="1,244,444" unit="人" />
      </Flex>
      <Flex>
        <MainTableCell title="累積退院者" summary="10,148,125" unit="人" />
        <MainTableCell title="死亡者数" summary="31,937" unit="人" />
      </Flex>
      <Flex>
        <MainTableCell title="対策病床数 112,445床" />
        <MainTableCell title="PCR検査陽性者数 11,511,562人" />
      </Flex>
      <Postscript>
        <div>
          臨床工学技士 14,378人 / 人工呼吸器 28,197台 / ECMO 1,412台
          2020年2月回答
        </div>
        <div>
          出典 一般社団法人 日本呼吸療法医学会　公益社団法人 日本臨床工学技士会
        </div>
      </Postscript>
    </Summary>
  );
});

const Summary = styled.div`
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
`;

const Postscript = styled.div`
  border: 0.3vw solid #ad232f;
  margin: 0 -0.3vw -0.3vw 0;
  padding: 0.1vh 0.5vw;
  width: 100%;
  text-align: center;
`;
