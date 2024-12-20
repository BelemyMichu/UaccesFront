import React, { useState, useEffect } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate";
import { useNavigate } from "react-router-dom";

import { loginAPI } from "../../services/api/auth";
import { setLocalStorage, getLocalStorage } from "../../functions/localStorage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI(email, password);
      if (res.status === 200) {
        console.log(res.data);
        if (res.data.rol === "Secretaría") {
          setLocalStorage("user", {
            rut: res.data.rut,
            correo: res.data.correo,
            rol: res.data.rol,
            nombre: res.data.nombre,
          });
          navigate("/programacion-academica");
        } else if (res.data.rol === "Admin Sala") {
          setLocalStorage("user", {
            rut: res.data.rut,
            correo: res.data.correo,
            rol: res.data.rol,
            nombre: res.data.nombre,
          });
          navigate("/gestion-salas");
        } else {
          setError("Usuario no autorizado");
        }
      }
    } catch (error) {
      console.log(error.data);
      setError("Correo o contraseña incorrectos");
    }
  };

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
      <div className="flex items-center justify-center h-screen bg-light-purple">
        <div className="flex sm:max-lg:flex-col shadow-lg rounded-lg overflow-hidden lg:max-w-4xl">
          {/* Sección de bienvenida */}
          <div className="w-1/2 sm:max-lg:w-full bg-custom-blue p-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              ¡Bienvenido a Uaccess!
            </h1>
            <img src="/image_12_1.png" alt="Lock Icon" className="w-200 h-20" />
          </div>

          {/* Formulario de inicio de sesión */}
          <div className="w-1/2 sm:max-lg:w-full bg-white p-10 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Iniciar sesión
              </h2>
              {error && (
                <div className="flex flex-row justify-between items-center bg-red-200 p-2 rounded-md">
                  <span>{error}</span>
                  <button onClick={() => setError("")}>X</button>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-red"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-red"
                />
              </div>
              <div className="flex  flex-row justify-around flex-wrap">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthTemplate>
  );
};

export default Login;
