import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./views/home";

import Punks from "./views/punks";
import Punk from "./views/punk";
import "./style.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/punks" exact element={<Punks />} />
          <Route path="/punks/:tokenId" exact element={<Punk />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
