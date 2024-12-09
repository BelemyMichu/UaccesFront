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

export const deleteAllAcademic = async () => {
  try {
    const { data, error } = await supabase.rpc("delete_programacion_academica");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al eliminar datos de programacion_academica:", error);
    throw error;
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
      return data;
    }
  } catch (err) {
    console.error("Error en la operación:", err.message);
  }
};

export const getTodayProfes = async (dia) => {
  try {
    const { data, error } = await supabase
      .from("programacion_academica")
      .select("*")
      .eq("Día", dia)
      .order("Nombre Profesor");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener datos de programacion_academica:", error);
  }
};

export const getProfeByQR = async (rut, edificio, sala) => {
  console.log(rut, edificio, sala);
  try {
    const { data, error } = await supabase.rpc("get_profe_by_hour", {
      input_rut: rut,
      input_edificio: edificio,
      input_sala: sala,
    });
    console.log(data);

    if (error) {
      console.log(error);
      throw error;
    } else {
      if (data.length === 0) {
        throw "No hay profesores con clases en esta hora.";
      } else {
        return data;
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAcademicByRut = async (rut, sala, sede) => {
  try {
    const { data, error } = await supabase
      .from("programacion_academica")
      .select("*")
      .eq("RUT Profesor", rut)
      .eq("Sala", sala)
      .eq("Edificio", sede);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener datos de programacion_academica:", error);
  }
};
