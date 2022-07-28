import { Router } from "./Router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import styled from "styled-components";
import { PageButton } from "./components/layout/PageButton";

function App() {
  return (
    <>
      <HeaderCss>
        <Header />
      </HeaderCss>

      <PageButton />

      <Router />

      <FooterCss>
        <Footer />
      </FooterCss>
    </>
  );
}

export default App;

const HeaderCss = styled.div`
  background-color: #ad232f;
  color: white;
`;

const FooterCss = styled.div`
  width: 100%;
  margin-top: 10px;
`;
