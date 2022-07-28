import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  summary?: string;
  unit?: string; //単位
};

/**
 *
 */
export const MainTableCell: FC<Props> = memo(({ title, summary, unit }) => {
  return (
    <Main>
      <Title>{title}</Title>
      {summary && unit && (
        <Flex>
          <Useratio>{summary}</Useratio>
          <Fontsmaller>{unit}</Fontsmaller>
        </Flex>
      )}
    </Main>
  );
});

const Main = styled.div`
  width: 50%;
`;

const Title = styled.div`
  border: 0.3vw solid #ad232f;
  margin: 0 -0.3vw -0.3vw 0;
  padding: 0.1vh 0.5vw;
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
  margin: 0 -0.3vw -0.3vw 0;
  padding: 0.1vh 0.5vw;
`;
