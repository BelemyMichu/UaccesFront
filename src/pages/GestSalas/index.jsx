import Ropita from "../../components/templates/Ropita";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { config } from "../../config";

const GestSalas = () => {
  const [selectedRoom, setSelectedRoom] = useState("A2 301");
  const [roomOptions, setRoomOptions] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Lu");

  const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  // Cambiar el día
  const changeDay = (direction) => {
    const currentIndex = daysOfWeek.indexOf(selectedDay);
    let newIndex;
    if (direction === "prev") {
      newIndex = (currentIndex - 1 + daysOfWeek.length) % daysOfWeek.length;
    } else {
      newIndex = (currentIndex + 1) % daysOfWeek.length;
    }
    setSelectedDay(daysOfWeek[newIndex]);
  };

  const obtenerHorarios = async (dia_semana) => {
    const { data, error } = await supabase.rpc("obtener_horarios", {
      dia_semana,
    });
    if (error) {
      console.error("Error al obtener horarios: ", error);
    } else {
      console.log("Horarios obtenidos: ", data);

      const uniqueRooms = Array.from(
        new Set(data.map((horario) => `${horario.edificio} ${horario.sala}`))
      );

      setRoomOptions(uniqueRooms);
      setHorarios(data);
    }
  };

  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    obtenerHorarios(selectedDay);
  }, [selectedDay]);

  return (
    <Ropita title="Gestión de Salas">
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Contenedor de opciones */}
        <div className="flex items-center justify-between mb-6">
          {/* Selector de Sala */}
          <div>
            <span className="text-gray-800 font-bold mr-2">
              Sala seleccionada:
            </span>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-gray-800"
            >
              {roomOptions.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Día */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => changeDay("prev")}
              className="border border-gray-300 rounded-md px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800"
            >
              ⬅
            </button>
            <span className="text-gray-800 font-bold w-24 text-center">
              {selectedDay}
            </span>
            <button
              onClick={() => changeDay("next")}
              className="border border-gray-300 rounded-md px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800"
            >
              ➡
            </button>
          </div>
        </div>

        {/* Tabla de Horarios */}
        <table className="border-collapse border border-gray-400 bg-purple-white w-full mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Horario ingreso</th>
              <th className="border px-4 py-2">Horario fin</th>
              <th className="border px-4 py-2">Asignatura</th>
              <th className="border px-4 py-2">Profesor</th>
            </tr>
          </thead>
          <tbody>
            {horarios.length > 0 ? (
              horarios
                .filter(
                  (horario) =>
                    `${horario.edificio} ${horario.sala}` === selectedRoom
                )
                .map((horario) => (
                  <tr key={horario.id}>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {horario["hora_inicio"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {horario["hora_fin"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {horario["nombre_asignatura"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {horario["nombre_profesor"]}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 border-gray-500 hover:bg-gray-200 duration-200 text-center"
                >
                  No hay horarios disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Ropita>
  );
};

export default GestSalas;
