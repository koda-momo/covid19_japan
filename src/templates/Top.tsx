import { FC } from "react";
import { MainTable } from "../components/top/MainTable";
import { PrefecturesTable } from "../components/top/PrefecturesTable";

/**
 * Top表示ページ.
 */
export const Top: FC = () => {
  return (
    <>
      <MainTable />
      <PrefecturesTable />
      トップ
    </>
  );
};
