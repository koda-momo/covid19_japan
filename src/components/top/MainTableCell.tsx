import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  title: string; //項目名
  summary?: number; //結果
  unit?: string; //単位
};

/**
 * メインテーブルの1マスずつ.
 */
export const MainTableCell: FC<Props> = memo(({ title, summary, unit }) => {
  return (
    <Main>
      <Title>{title}</Title>
      {summary && unit && (
        <Flex>
          <Useratio>{summary.toLocaleString()}</Useratio>
          <Fontsmaller>{unit}</Fontsmaller>
        </Flex>
      )}
    </Main>
  );
});

const Main = styled.div`
  width: 100%;
  min-width: 200px; //表全体の横幅が300px + 線が被るので3.5/2
`;

const Title = styled.div`
  border: 3.5px solid #ad232f;
  padding: 1px;
  text-align: center;
`;

const Useratio = styled.div`
  font-size: 260%;
`;

const Fontsmaller = styled.div`
  font-size: 160%;
`;

const Flex = styled.div`
  display: flex;
  background-color: #ad232f;
  color: white;
  justify-content: center;
  align-items: flex-end;
`;
