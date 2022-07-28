import { Router } from "./Router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import styled from "styled-components";

function App() {
  return (
    <>
      <HeaderCss>
        <Header />
      </HeaderCss>

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
