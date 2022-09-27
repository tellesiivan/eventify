import { Routes, Route } from "react-router-dom";

import BaseNav from "./layouts/BaseNav";
import Home from "./screens/Home";

function App() {
  return (
    <Routes>
      <Route element={<BaseNav />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
