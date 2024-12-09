import Ropita from "../../components/templates/Ropita";
import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { config } from "../../config";
import { createClient } from "@supabase/supabase-js";

registerLocale("es", es);

export default function Reportes() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [salas, setSalas] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  const enviarDatosBackend = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/report/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: JSON.stringify(data) }), // Mandar como string
        },
      );
      if (!response.ok) {
        throw new Error("Error al enviar datos al backend");
      }
      console.log("Datos enviados exitosamente");
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  const cargarSalasYGenerar = async () => {
    try {
      const { data, error } = await supabase
        .from("programacion_academica")
        .select("*");

      if (error) throw error;

      setSalas(data);
      await enviarDatosBackend(data);
      setIsReportGenerated(true);

      const { data: fileData, error: fileError } = await supabase.storage
        .from("Reporte")
        .download("informes/reporte_profesional.pdf");

      if (fileError) throw fileError;

      const url = URL.createObjectURL(fileData);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error al cargar datos de programacion_academica:", error);
    }
  };

  return (
    <Ropita title="Reportes">
      <div className="min-h-screen flex flex-col items-center py-12">
        <div className="bg-purple-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Establecer plazo del reporte
            </h1>

            <div className="w-full mb-8 flex flex-col items-center">
              <label className="block text-xl font-medium text-gray-700 mb-1 text-center">
                Inicio del Plazo
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                locale="es"
                placeholderText="Seleccionar fecha"
                className="px-4 py-2 border-2 border-custom-red rounded-lg shadow-sm focus:ring focus:ring-indigo-300 w-[250px] bg-purple-white"
              />
            </div>

            <div className="w-full mb-8 flex flex-col items-center">
              <label className="block text-xl font-medium text-gray-700 mb-1 text-center">
                Fin del Plazo
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                locale="es"
                placeholderText="Seleccionar fecha"
                className="px-4 py-2 border-2 border-custom-red rounded-lg shadow-sm focus:ring focus:ring-indigo-300 w-[250px] bg-purple-white"
              />
            </div>

            <button
              className="w-[200px] bg-custom-red text-white py-2 rounded-lg hover:bg-custom-red-2 transition"
              onClick={cargarSalasYGenerar}
            >
              Generar
            </button>
          </div>
        </div>

        {isReportGenerated && (
          <div className="mt-6 flex items-center">
            <p className="text-gray-700 mr-2">Descargar:</p>
            <a
              href={downloadUrl}
              className="flex items-center text-red-600 font-semibold hover:underline"
              download="reporte.pdf"
            >
              <img src="pdf-icon.png" alt="PDF icon" className="w-5 h-5 mr-1" />{" "}
              PDF
            </a>
          </div>
        )}
      </div>
    </Ropita>
  );
}
