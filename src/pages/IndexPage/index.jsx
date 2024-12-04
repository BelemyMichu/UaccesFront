import React, { useState, useEffect } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate";
import { useNavigate } from "react-router-dom";

import { getLocalStorage } from "../../functions/localStorage";

function IndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLocalStorage("user");
    if (user) {
      user.rol === "Secretaría"
        ? navigate("/programacion-academica")
        : user.rol === "Admin Sala"
        ? navigate("/histSalas")
        : navigate("/gestion-usuarios");
    }
  }, []);
  return (
    <AuthTemplate>
      <div className="flex items-center justify-center h-screen bg-purple-200">
        <div className="flex sm:max-lg:flex-col shadow-lg rounded-lg overflow-hidden lg:max-w-4xl">
          {/* Sección de bienvenida */}
          <div className="w-1/2 sm:max-lg:w-full bg-purple-300 p-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              ¡Bienvenido a Uaccess!
            </h1>
            <img src="/image_12_1.png" alt="Lock Icon" className="w-200 h-20" />
          </div>

          {/* Formulario de inicio de sesión */}
          <div className="w-1/2 sm:max-lg:w-full bg-white p-10 flex flex-col justify-center">
            <div className="flex flex-col space-y-4 gap-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Iniciar como:
              </h2>
              <button
                onClick={() => navigate("/login/qr")}
                className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
              >
                Profesor o Mantención
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-purple-500 text-white px-4 py-2 font-semibold rounded-xl hover:bg-purple-600 duration-200"
              >
                Administración
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthTemplate>
  );
}

export default IndexPage;
