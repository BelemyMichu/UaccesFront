import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HistSalas from "./pages/HistSalas";
import LectorExcel from "./pages/LectorExcel";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Asistencias from "./pages/Asistencias";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/*Admin de salas*/}
        <Route path="/histSalas" element={<HistSalas />} />
        {/* <Route path="/reportes" element={<Reportes />} /> */}

        {/*secretario*/}
        <Route path="/programacion-academica" element={<LectorExcel />} />
        <Route path="/asistencias" element={<Asistencias />} />
        {/* <Route path="/gestion-usuarios" element={<Users />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
