import * as XLSX from "xlsx";

export const leerExcel = (file, setExcelData) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    setExcelData(jsonData); // Guardar los datos en el estado
    console.log(jsonData);
  };

  reader.readAsArrayBuffer(file);
};
