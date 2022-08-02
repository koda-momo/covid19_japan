import { FC, memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  bed: number; //病床数
  patients: number; //現在患者数
  upDown: "up" | "down";
  fullName: string; //都道府県削っていない名前
};

/**
 * 都道府県別テーブルのセル1つずつ.
 */
export const PrefecturesCell: FC<Props> = memo(
  ({ name, bed, patients, upDown, fullName }) => {
    return (
      <>
        <Link to="/prefectures" state={{ fullName: fullName }}>
          <Cell>
            <Flex>
              <PrefectureName>{name}</PrefectureName>

              {upDown === "up" ? (
                <UpIcon>
                  <img src="/img/trendarrow01.svg" alt="up" />
                </UpIcon>
              ) : (
                <DownIcon>
                  <img src="/img/trendarrow03.svg" alt="down" />{" "}
                </DownIcon>
              )}
            </Flex>
            <div>{Math.round((patients / bed) * 100)}%</div>
            <div>
              <BoldFont>{patients.toLocaleString()}</BoldFont>
              <SmallFont>/{bed}</SmallFont>
            </div>
          </Cell>
        </Link>
      </>
    );
  }
);

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
  align-items: center;
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

const UpIcon = styled.div`
  width: 15px;
`;

const DownIcon = styled.div`
  width: 15px;
  transform: scale(1, -1);
`;
