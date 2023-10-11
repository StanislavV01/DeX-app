import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Header from "./widgets/Header/Header";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </>
  )
}

export default App;
