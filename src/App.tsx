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

      {/* <Footer /> */}
    </>
  );
}

export default App;

const HeaderCss = styled.div`
  background-color: #ad232f;
  color: white;
`;
