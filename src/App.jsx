import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HistSalas from "./pages/HistSalas";
import LectorExcel from "./pages/LectorExcel";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

function App() {
  return (
    
    <Router>
      <Routes>
        {/*<Route path="/" element={< />} />*/}
        
        <Route path="/histSalas" element={<HistSalas />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/lectorExcel" element={<LectorExcel />} />
      </Routes>
    </Router>
  );
}

export default App;
