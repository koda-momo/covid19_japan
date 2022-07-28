import { FC, memo } from "react";
import styled from "styled-components";
import { MainTableCell } from "./MainTableCell";

/**
 * メインテーブル.
 */
export const MainTable: FC = memo(() => {
  return (
    <Summary>
      <Flex>
        <RightCell>
          <MainTableCell
            title="現在患者数/対策病床数"
            summary="1,106"
            unit="%"
          />
        </RightCell>
        <LeftCell>
          <MainTableCell title="現在患者数" summary="1,244,444" unit="人" />
        </LeftCell>
      </Flex>

      <Flex>
        <RightCell>
          <MainTableCell title="累積退院者" summary="10,148,125" unit="人" />
        </RightCell>
        <LeftCell>
          <MainTableCell title="死亡者数" summary="31,937" unit="人" />
        </LeftCell>
      </Flex>

      <Flex>
        <RightCell>
          <MainTableCell title="対策病床数 112,445床" />
        </RightCell>
        <LeftCell>
          <MainTableCell title="PCR検査陽性者数 11,511,562人" />
        </LeftCell>
      </Flex>
      <Postscript>
        <div>臨床工学技士 14,378人 / 人工呼吸器 28,197台 / ECMO 1,412台</div>
        <div>
          2020年2月回答 出典 一般社団法人 日本呼吸療法医学会　公益社団法人
          日本臨床工学技士会
        </div>
      </Postscript>
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
