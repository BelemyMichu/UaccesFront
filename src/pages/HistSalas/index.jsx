import Ropita from "../../components/templates/Ropita";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { config } from "../../config";
import { Link } from "react-router-dom";

const HistSalas = () => {
  const [salas, setSalas] = useState([]);

  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  const cargarSalas = async () => {
    try {
      const { data, error } = await supabase
        .from("programacion_academica")
        .select("*");
      if (error) throw error;
      setSalas(data);
    } catch (error) {
      console.error("Error al cargar datos de programacion_academica:", error);
    }
  };

  useEffect(() => {
    cargarSalas();
  }, []);

  return (
    <Ropita title="Historial de Salas">
      <table className="border-collapse border border-gray-400 w-full mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Facultad</th>
            <th className="border px-4 py-2">Campus</th>
            <th className="border px-4 py-2">Periodo</th>
            <th className="border px-4 py-2">Curso</th>
            <th className="border px-4 py-2">Sección</th>
            <th className="border px-4 py-2">Profesor</th>
            <th className="border px-4 py-2">Asignatura</th>
            <th className="border px-4 py-2">Horario</th>
            <th className="border px-4 py-2">Sala</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala) => (
            <tr key={sala.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{sala.Facultad}</td>
              <td className="border px-4 py-2">{sala.Campus}</td>
              <td className="border px-4 py-2">{sala.Periodo}</td>
              <td className="border px-4 py-2">{sala.Curso}</td>
              <td className="border px-4 py-2">{sala["Sección"]}</td>
              <td className="border px-4 py-2">{sala["Nombre Profesor"]}</td>
              <td className="border px-4 py-2">{sala["Nombre Asignatura"]}</td>
              <td className="border px-4 py-2">{sala.Horario}</td>
              <td className="border px-4 py-2">{sala.Sala}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Ropita>
  );
};

export default HistSalas;
