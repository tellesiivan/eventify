import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";

function App() {
  return (
    <Routes>
      {/* BaseNav: add a route below to include prelogin layout*/}

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
