import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HistSalas from "./pages/HistSalas";
import LectorExcel from "./pages/LectorExcel";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Asistencias from "./pages/Asistencias";
import GestionUsuario from "./pages/GestionUsuario";
import Reportes from "./pages/Reportes";

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
        <Route path="/gestion-usuarios" element={<GestionUsuario />} />
        <Route path="/Reportes" element={<Reportes />} />

      </Routes>
    </Router>
  );
}

export default App;
