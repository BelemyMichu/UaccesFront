import React, { useState, useEffect } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Userqr } from "../../components/Userqr";
import { useNavigate } from "react-router-dom";

function LoginQR() {
  const [qrResult, setQrResult] = useState(null);
  const [sala, setSala] = useState("301");
  const [edificio, setEdificio] = useState("A2");
  const navigate = useNavigate();

  const extractRUT = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get("RUN");
    } catch (error) {
      console.error("Error al analizar la URL:", error);
      return null;
    }
  };

  const simulateSuccess = () => {
    const simulatedResult =
      "https://portal.sidiv.registrocivil.cl/docstatus?RUN=20673832-4&type=CEDULA&serial=526206509&mrz=526206509101052593105250";
    const run = extractRUT(simulatedResult);
    setQrResult(run);
    console.log("Simulación exitosa: RUN =", run);
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 120 },
      false // El tercer argumento en `false` asegura que no reinicie al desmontar
    );

    const success = (result) => {
      const run = extractRUT(result);
      console.log("RUN escaneado:", run);
      setQrResult(run); // Guarda el resultado escaneado
      scanner.clear(); // Detiene el escáner después del éxito
    };

    const error = (err) => {
      console.warn(err);
    };

    if (document.getElementById("reader")) {
      scanner.render(success, error);
    }

    // Cleanup: Detiene el escáner cuando se desmonta el componente
    return () => {
      scanner.clear();
    };
  }, []); // Sin `qrResult` en dependencias

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

          {/* Escaneo QR */}
          <div className="w-1/2 sm:max-lg:w-full bg-white p-10 flex flex-col justify-center">
            <div className="flex flex-col space-y-4 gap-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Escanea el QR del carnet para ingresar a la sala {edificio},{" "}
                {sala}
              </h2>
              <div>
                {qrResult ? (
                  <Userqr
                    rut={qrResult}
                    sala={sala}
                    sede={edificio}
                    setRut={setQrResult}
                  />
                ) : (
                  <div>
                    <div id="reader"></div>
                    <button
                      onClick={simulateSuccess}
                      className="bg-green-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-green-600 transition-colors mt-4"
                    >
                      Simular Escaneo Exitoso
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate("/")}
                className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthTemplate>
  );
}

export default LoginQR;
