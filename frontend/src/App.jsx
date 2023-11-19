import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/flights" element={<List />}></Route>
        <Route path="/flights/:id" element={<Flight />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
