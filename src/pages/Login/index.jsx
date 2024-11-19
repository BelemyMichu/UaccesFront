import React, { useState, useEffect } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate";
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Link } from "react-router-dom";

function LoginPage() {
  const [selectedBtn, setSelectedBtn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrResult, setQrResult] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión simulada
    alert("Inicio de sesión simulado");
    push;
  };

  useEffect(() => {
    if (selectedBtn === "qrButton" && document.getElementById("reader")) {
      const success = (result) => {
        setQrResult(result);
        scanner.clear();
      };
  
      const error = (err) => {
        console.warn(err);
      };
  
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 120 },
        true
      );
      scanner.render(success, error);
    }
  }, [selectedBtn]);
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
            {!selectedBtn && (
              <div className="flex flex-col space-y-4 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Iniciar como:
                </h2>
                <button
                  onClick={() => setSelectedBtn("qrButton")}
                  className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                >
                  Profesor o Mantención
                </button>
                <button
                  onClick={() => setSelectedBtn("adminButton")}
                  className="bg-purple-500 text-white px-4 py-2 font-semibold rounded-xl hover:bg-purple-600 duration-200"
                >
                  Administración
                </button>
              </div>
            )}

            {selectedBtn === "adminButton" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Iniciar sesión
                </h2>
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
                <div className="flex  flex-row justify-around flex-wrap">
                  <button
                    onClick={() => setSelectedBtn("")}
                    className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                  >
                    Volver
                  </button>
                  <Link
                    to="/lectorExcel"
                    className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </form>
            )}

            {selectedBtn === "qrButton" && (
              <div className="flex flex-col space-y-4 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Escanea el QR del carnet para habilitar sala
                </h2>
                <div>
                  {qrResult ? (
                    <a href={qrResult}>Ir a sitio</a>
                  ) : (
                    <div id="reader"></div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedBtn("")}
                  className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                >
                  Volver
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthTemplate>
  );
}

export default LoginPage;
