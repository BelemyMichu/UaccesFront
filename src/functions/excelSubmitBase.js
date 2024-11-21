import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";
import { config } from "../config";

// Inicializa el cliente de Supabase
const supabase = createClient(config.supabaseUrl, config.supabaseKey);

// Función para formatear las fechas en formato 'YYYY-MM-DD'
const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Verifica si la fecha es válida
  if (isNaN(date.getTime())) {
    console.warn(`Fecha inválida: ${dateString}`);
    return null; // Devuelve null o una cadena vacía si la fecha no es válida
  }

  return date.toISOString().split("T")[0]; // Formato 'YYYY-MM-DD'
};

export const leerExcelYSubir = async (file) => {
  const reader = new FileReader();

  reader.onload = async (event) => {
    const byteData = new Uint8Array(event.target.result);
    const workbook = XLSX.read(byteData, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convierte la hoja a JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Filtra los encabezados y los datos
    const headers = jsonData[0]; // Asumiendo que la primera fila son los encabezados
    const rows = jsonData.slice(1); // Toma todas las filas menos la primera

    // Prepara los datos para subir a Supabase
    const dataToInsert = rows.map((row) => {
      let obj = {};
      headers.forEach((header, index) => {
        let value =
          row[index] !== undefined ? row[index].toString().trim() : null;

        // Si el valor es una fecha, lo formatea
        if (header.toLowerCase().includes("fecha") && value) {
          value = formatDate(value);
        }

        obj[header] = value;
      });
      return obj;
    });

    // Inserta los datos en Supabase
    try {
      const { data: supabaseData, error } = await supabase
        .from("programacion_academica") // Nombre de la tabla
        .insert(dataToInsert);

      if (error) {
        console.error("Error al insertar datos:", error.message);
      } else {
        console.log("Datos insertados correctamente:", supabaseData);
      }
    } catch (err) {
      console.error("Error en la operación:", err.message);
    }
  };

  reader.readAsArrayBuffer(file);
};
