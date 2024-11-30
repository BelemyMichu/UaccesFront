import Ropita from "../../components/templates/Ropita";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale"; 
import "react-datepicker/dist/react-datepicker.css"; 

registerLocale("es", es);

export default function Reportes() {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isReportGenerated, setIsReportGenerated] = useState(false); 

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
                className="px-4 py-2 border-2 border-purple-500 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 w-[250px] bg-purple-white"
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
                className="px-4 py-2 border-2 border-purple-500 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 w-[250px] bg-purple-white"
              />
            </div>

            <button
              className="w-[200px] bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
              onClick={() => setIsReportGenerated(true)} 
            >
              Generar
            </button>
          </div>
        </div>

        {/* Sale cuando la persona aprete el botoncito */}
        {isReportGenerated && (
          <div className="mt-6 flex items-center">
            <p className="text-gray-700 mr-2">Descargar:</p>
            <a
              href="#"
              className="flex items-center text-red-600 font-semibold hover:underline"
            >
               <img src="pdf-icon.png" alt="PDF icon" className="w-5 h-5 mr-1" /> {/*poner algun icon bonis */}
              PDF
            </a>
          </div>
        )}
      </div>
    </Ropita>
  );
}

