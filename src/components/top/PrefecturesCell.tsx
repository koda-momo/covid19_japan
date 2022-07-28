import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  name: string;
  bed: number; //病床数
  patients: number; //現在患者数
};

/**
 * 都道府県別テーブルのセル1つずつ.
 */
export const PrefecturesCell: FC<Props> = memo(({ name, bed, patients }) => {
  return (
    <>
      <Cell>
        <Flex>
          <PrefectureName>{name}</PrefectureName>
          <Icon>
            <img src="/img/trendarrow01.svg" alt="up" />
          </Icon>

          {/* <img src="/img/trendarrow03.svg" alt="down" /> */}
        </Flex>
        <div>{Math.round((patients / bed) * 100)}%</div>
        <div>
          <BoldFont>{patients}</BoldFont>
          <SmallFont>/{bed}</SmallFont>
        </div>
      </Cell>
    </>
  );
});

const Cell = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  width: 100%;
  padding: 1px;
  font-size: 13px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const SmallFont = styled.span`
  font-size: 10px;
`;

const BoldFont = styled.span`
  font-weight: bold;
`;

const PrefectureName = styled.span`
  font-size: 15px;
`;

const Icon = styled.div`
  width: 15px;
`;
