import { FC, memo } from "react";
import styled from "styled-components";

/**
 * ヘッダーコンポーネント.
 */
export const Header: FC = memo(() => {
  return (
    <>
      <Title>COVID-19 Japan</Title>
      <Subtitle>新型コロナウイルス対策ダッシュボード</Subtitle>
    </>
  );
});

const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 13px;
  font-size: 45px;
`;

const Subtitle = styled.div`
  text-align: center;
  margin: 0 0 0.5em 0;
  padding: 0.3em;
  font-size: 3vmin;
`;
