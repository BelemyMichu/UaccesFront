import "./index.css";
import { useState } from "react";
import { leerExcel } from "../../functions/excelReader";

function LectorExcel() {
  const [excelData, setExcelData] = useState([]); // Para almacenar los datos leídos

  // Función que se ejecuta al seleccionar un archivo
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado

    if (file) {
      leerExcel(file, setExcelData); // Usar la función importada para procesar el archivo
    }
  };

  return (
    <div className="container">
      <h1>Prueba de Lectura de Excel</h1>
      <span className="text">Selecciona un archivo</span>
      <input type="file" name="file" id="file" onChange={handleFileUpload} />

      {/* Mostrar los datos leídos del archivo Excel */}
      {excelData.length > 0 && (
        <div>
          <h2>Datos del archivo Excel:</h2>
          <ul>
            {excelData.map((row, index) => (
              <li key={index}>{JSON.stringify(row)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LectorExcel;
