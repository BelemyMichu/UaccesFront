import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LectorExcel from "./pages/LectorExcel";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/Register";
import Asistencias from "./pages/Asistencias";
import GestionUsuario from "./pages/GestionUsuario";
import Reportes from "./pages/Reportes";
import LoginQR from "./pages/LoginQR";
import Login from "./pages/Login";
import GestSalas from "./pages/GestSalas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/qr" element={<LoginQR />} />

        {/*Admin de salas*/}
        <Route path="/gestion-usuarios" element={<GestionUsuario />} />

        {/*secretario*/}
        <Route path="/programacion-academica" element={<LectorExcel />} />
        <Route path="/asistencias" element={<Asistencias />} />
        <Route path="/Reportes" element={<Reportes />} />
        <Route path="/gestion-salas" element={<GestSalas />} />
      </Routes>
    </Router>
  );
}

export default App;
