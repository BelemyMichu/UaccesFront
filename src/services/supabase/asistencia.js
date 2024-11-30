import { config } from "../../config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export const createAsistencia = async (formData) => {
  try {
    const { data, error } = await supabase
      .from("asistencia")
      .insert(formData);

    if (error) {
      console.error("Error al insertar datos:", error.message);
    } else {
      console.log("Datos insertados correctamente:", data);
      return data;
    }
  } catch (err) {
    console.error("Error en la operación:", err.message);
  }
};

export const getAsistencias = async () => {
  try {
    const { data, error } = await supabase
      .from("asistencia")
      .select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener datos de asistencia:", error);
  }
};
