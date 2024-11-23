import { config } from "../../config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export const getProgramacionAcademica = async () => {
  try {
    const { data, error } = await supabase
      .from("programacion_academica")
      .select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener datos de programacion_academica:", error);
  }
};

export const deleteAcademic = async (id) => {
  try {
    const { data, error } = await supabase
      .from("programacion_academica")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al eliminar datos de programacion_academica:", error);
  }
};

export const editAcademic = async (formData) => {
  try {
    const dataToUpdate = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        acc[key] = value === "" && typeof value === "boolean" ? null : value; // Si está vacío y es booleano, asigna null
        return acc;
      },
      {}
    );
    const { id, ...updateData } = dataToUpdate;
    console.log(updateData);
    const { data, error } = await supabase
      .from("programacion_academica")
      .update(updateData)
      .eq("id", formData.id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al editar datos de programacion_academica:", error);
  }
};

export const addAcademic = async (formData) => {
  try {
    const dataToInsert = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        acc[key] = value === "" && typeof value === "boolean" ? null : value; // Si está vacío y es booleano, asigna null
        return acc;
      },
      {}
    );
    const { data, error } = await supabase
      .from("programacion_academica")
      .insert(dataToInsert);

    if (error) {
      console.error("Error al insertar datos:", error.message);
    } else {
      console.log("Datos insertados correctamente:", data);
    }
  } catch (err) {
    console.error("Error en la operación:", err.message);
  }
};
