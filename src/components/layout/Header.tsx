import { FC, memo } from "react";

/**
 * ヘッダーコンポーネント.
 */
export const Header: FC = memo(() => {
  return (
    <>
      <h1>COVID-19 Japan</h1>
      <div>新型コロナウイルス対策ダッシュボード</div>
    </>
  );
});
