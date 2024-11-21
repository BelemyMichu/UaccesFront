import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../../../functions/LocalStorage";
import { useNavigate, Link } from "react-router-dom";

const Ropita = ({ children, title = "", className = "" }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    try {
      const user = getLocalStorage("user");
      !user ? navigate("/") : setUser(user);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }, []);
  return (
    <div className={`flex flex-col  min-h-screen bg-gray-100 ${className}`}>
      <header className="w-full text-black">
        <nav className="h-[80px] flex justify-between items-center shadow p-4">
          <p>LOGO</p>
          <div className="flex space-x-4">
            {user && user.rol === "Secretario" && (
              <ul className="flex space-x-4">
                <li>Gestión de usuarios</li>
                <li>Asistencia</li>
                <li><Link to={"/programacion-academica"}>Programación academica</Link></li>
              </ul>
            )}

            {user && user.rol !== "Secretario" && (
              <ul className="flex space-x-4">
                <li>Gestión de salas</li>
                <li>Reportes</li>
              </ul>
            )}
            <span> | </span>
            <span> USER </span>
          </div>
        </nav>
        <h1 className="text-xl font-normal text-left ml-2 mt-2">{title}</h1>
      </header>

      <main className="p-6">
        <div className="max-w-5xl mx-auto bg-white rounded shadow-md p-4">
          {children}
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 - Sistema de Gestión de Salas</p>
      </footer>
    </div>
  );
};

export default Ropita;
