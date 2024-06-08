import "./App.css";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
