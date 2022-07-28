import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  name: string;
};

/**
 *
 */
export const PrefecturesCell: FC<Props> = memo(({ name }) => {
  return (
    <>
      <Cell>
        <Flex>
          <div>{name}</div>
          <Icon>
            <img src="/img/trendarrow01.svg" alt="up" />
          </Icon>

          {/* <img src="/img/trendarrow03.svg" alt="down" /> */}
        </Flex>
        <div>555%</div>
        <div>4,492/809</div>
      </Cell>
    </>
  );
});

const Cell = styled.div`
  background-color: black;
  width: 10%;
  color: white;
  text-align: center;
`;

const Flex = styled.div`
  display: flex;
  gap: 3px;
  justify-content: center;
`;

const Icon = styled.div`
  width: 15px;
`;
