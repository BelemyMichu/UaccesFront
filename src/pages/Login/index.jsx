import React, { useState } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión simulada
    alert("Inicio de sesión simulado");
    push;
  };

  return (
    <AuthTemplate>
      <div className="flex items-center justify-center h-screen bg-purple-200">
        <div className="flex shadow-lg rounded-lg overflow-hidden max-w-4xl">
          {/* Sección de bienvenida */}
          <div className="w-1/2 bg-purple-300 p-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Bienvenido a Uaccess!
            </h1>
            <img src="/image_12_1.png" alt="Lock Icon" className="w-200 h-20" />
          </div>

          {/* Formulario de inicio de sesión */}
          <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Inicio de Sesión
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="text-right text-sm">
                <a href="#" className="text-purple-500 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <Link
                to="/histSalas"
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </form>
          </div>
        </div>
      </div>
    </AuthTemplate>
  );
}

export default LoginPage;
