import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HistSalas from "./pages/HistSalas";
import LectorExcel from "./pages/LectorExcel";

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={< />} />*/}
        <Route path="/" element={<HistSalas />} />
        <Route path="/lectorExcel" element={<LectorExcel />} />
      </Routes>
    </Router>
  );
}

export default App;
