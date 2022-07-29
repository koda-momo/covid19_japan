import { FC } from "react";
import { PageButton } from "../components/layout/PageButton";
import { LineGraphItem } from "../components/lineGraph/LineGraphItem";

/**
 * 折れ線グラフ表示ページ.
 */
export const LineGraph: FC = () => {
  return (
    <>
      <PageButton />
      <LineGraphItem />
    </>
  );
};
