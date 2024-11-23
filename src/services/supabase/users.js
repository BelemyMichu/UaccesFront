import { config } from "../../config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export const getUsuarios = async () => {
  try {
    const { data, error } = await supabase.from("usuarios").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error);
  }
};

export const editUser = async (formData) => {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update(formData)
      .eq("rut", formData.rut);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al editar datos de usuarios:", error);
  }
};

export const deleteUser = async (rut) => {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .delete()
      .eq("rut", rut);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al eliminar datos de usuarios:", error);
  }
};

export const addUser = async (formData) => {
  try {
    const { data, error } = await supabase.from("usuarios").insert(formData);
    if (error) {
      console.error("Error al insertar datos:", error.message);
    } else {
      console.log("Datos insertados correctamente:", data);
    }
  } catch (err) {
    console.error("Error en la operación:", err.message);
  }
};
