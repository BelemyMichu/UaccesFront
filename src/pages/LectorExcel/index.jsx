import "./index.css";
import { useState } from "react";
import { leerExcelYSubir } from "../../functions/excelSubmitBase";
import * as XLSX from "xlsx";

function LectorExcel() {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      leerExcelYSubir(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = new Uint8Array(event.target.result);
        const workbook = XLSX.read(fileData, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="container">
      <h1>Prueba de Lectura y Subida de Excel</h1>
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
