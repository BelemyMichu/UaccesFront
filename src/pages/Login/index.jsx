import React, { useState, useEffect } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

import { loginAPI } from "../../services/api/auth";
import { setLocalStorage, getLocalStorage } from "../../functions/localStorage";

import { Userqr } from "../../components/Userqr";

function LoginPage() {
  const [selectedBtn, setSelectedBtn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrResult, setQrResult] = useState();
  const [sala, setSala] = useState(301);
  const [edificio, setEdificio] = useState("A2");

  const navigate = useNavigate();

  const extractRUT = (url) => {
    try {
      const parsedUrl = new URL(url);
      const run = parsedUrl.searchParams.get("RUN");
      return run;
    } catch (error) {
      console.error("Error al analizar la URL:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI(email, password);
      if (res.status === 200) {
        console.log(res.data);
        setLocalStorage("user", {
          rut: res.data.rut,
          correo: res.data.correo,
          rol: res.data.rol,
          nombre: res.data.nombre,
        });
        if (res.data.rol === "Secretaría") {
          navigate("/programacion-academica");
        } else if (res.data.rol === "Admin Sala") {
          navigate("/histSalas");
        }
      }
    } catch (error) {
      console.log(error.data);
      alert("Inicio de sesión fallido");
    }
  };

  useEffect(() => {
    if (selectedBtn === "qrButton" && document.getElementById("reader")) {
      const success = (result) => {
        const run = extractRUT(
          "https://portal.sidiv.registrocivil.cl/docstatus?RUN=20673832-4&type=CEDULA&serial=526206509&mrz=526206509101052593105250"
        );
        console.log("RUN escaneado:", run);
        setQrResult(run); // Mantén el URL completo si lo necesitas
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
    // } else {
    //   const run = extractRUT(
    //     "https://portal.sidiv.registrocivil.cl/docstatus?RUN=..."
    //   );
    //   setQrResult(run);
    }
  }, [selectedBtn]);

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
                    type="button"
                    onClick={() => setSelectedBtn("")}
                    className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            )}

            {selectedBtn === "qrButton" && (
              <div className="flex flex-col space-y-4 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Escanea el QR del carnet para ingresar a la sala {edificio},{" "}
                  {sala}
                </h2>
                <div>
                  {qrResult ? (
                    <Userqr rut={qrResult} sala={sala} sede={edificio} setRut={setQrResult} />
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
