import { FC, memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

/**
 * ページを切り替えるボタンコンポーネント.
 */
export const PageButton: FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  //今そのページにいるか否か
  const [isTop, setIsTop] = useState(false);
  const [isLine, setIsLine] = useState(false);

  /**
   * パス変更でボタンの色を変える.
   */
  useEffect(() => {
    //Topページ
    if (location.pathname === "/") {
      setIsTop(true);
      setIsLine(false);
      return;
    }

    //グラフページ
    if (location.pathname === "/linegraph") {
      setIsTop(false);
      setIsLine(true);
      return;
    }

    //その他のページ
    setIsTop(false);
    setIsLine(false);
  }, [location.pathname]);

  /**
   * Topページに遷移.
   */
  const gotoTop = useCallback(() => {
    navigate("/");
  }, [navigate]);

  /**
   * 折れ線グラフページに遷移.
   */
  const gotoLine = useCallback(() => {
    navigate("/linegraph");
  }, [navigate]);

  return (
    <>
      <Flex>
        {isTop ? (
          <OnButton type="button" onClick={gotoTop}>
            Top
          </OnButton>
        ) : (
          <OffButton type="button" onClick={gotoTop}>
            Top
          </OffButton>
        )}

        {isLine ? (
          <OnButton type="button" onClick={gotoLine}>
            概況
          </OnButton>
        ) : (
          <OffButton type="button" onClick={gotoLine}>
            概況
          </OffButton>
        )}
      </Flex>
    </>
  );
});

const OnButton = styled.button`
  background-color: #ad232f;
  color: white;
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 2%;
`;
const OffButton = styled.button`
  background-color: gray;
  color: white;
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 2%;
`;

const Flex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;
