import { Router } from "./Router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
