import { Router } from "./Router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import styled from "styled-components";
import { PageButton } from "./components/layout/PageButton";

function App() {
  return (
    <All>
      <HeaderCss>
        <Header />
      </HeaderCss>

      <PageButton />

      <Router />

      <FooterCss>
        <Footer />
      </FooterCss>
    </All>
  );
}

export default App;

const All = styled.div`
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 120px; //Footerの高さ
  box-sizing: border-box;
`;

const HeaderCss = styled.div`
  background-color: #ad232f;
  color: white;
`;

const FooterCss = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 120px;
  position: absolute; /*←絶対位置*/
  bottom: 0; /*下に固定*/
`;
