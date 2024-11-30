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

export const leerExcelYSubir = async (
  file,
  type = "programacion_academica"
) => {
  const reader = new FileReader();

  reader.onload = async (event) => {
    const byteData = new Uint8Array(event.target.result);
    const workbook = XLSX.read(byteData, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convierte la hoja a JSON (filas como arreglos)
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Asegúrate de separar encabezados y datos correctamente
    const headers = jsonData[0]; // Primera fila como encabezados
    const rows = jsonData.slice(1); // Resto de filas como datos

    // Función para convertir decimal a formato HH:MM:SS
    const decimalToTime = (decimal) => {
      const totalSeconds = Math.round(decimal * 24 * 3600);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    // Prepara los datos para subir a Supabase
    const dataToInsert = rows.map((row) => {
      let obj = {};
      headers.forEach((header, index) => {
        let value =
          row[index] !== undefined ? row[index].toString().trim() : null;

        // Si el encabezado sugiere que es un tiempo, convierte el valor decimal
        if (
          header.toLowerCase().includes("hora") && // Detecta columnas de tiempo
          value &&
          !isNaN(value) // Verifica si es un número
        ) {
          value = decimalToTime(parseFloat(value)); // Convierte el valor decimal a HH:MM:SS
        }

        // Si el valor es una fecha, lo formatea (si aplica)
        if (
          header.toLowerCase().includes("fecha") &&
          value &&
          type !== "user"
        ) {
          value = formatDate(value);
        }

        obj[header] = value;
      });
      return obj;
    });

    // Inserta los datos en Supabase
    try {
      const { data: supabaseData, error } = await supabase
        .from(type === "user" ? "usuarios" : "programacion_academica") // Nombre de la tabla
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
