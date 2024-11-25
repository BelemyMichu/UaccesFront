import { useEffect, useState } from "react";

import { getUserByRUTAPI } from "../../services/supabase/users";
import { AddAcademicByQR } from "../../services/supabase/academic";

const Userqr = ({ rut, sala, sede }) => {
  const [user, setUser] = useState([]);
  function formatFecha(dateStr) {
    // Convierte el string de fecha a un objeto Date
    const date = new Date(dateStr);

    // Obtiene el día de la semana (en español)
    const diasSemana = ["Dom", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
    const diaSemana = diasSemana[date.getDay()]; // Obtiene el nombre del día

    // Obtiene la hora y los minutos
    const horas = date.getHours();
    const minutos = date.getMinutes().toString().padStart(2, "0"); // Asegura que los minutos sean de dos dígitos

    // Calcula la hora de fin (suponiendo una duración de 45 minutos)
    const horaFin = new Date(date);
    horaFin.setMinutes(horaFin.getMinutes() + 45);
    const horasFin = horaFin.getHours();
    const minutosFin = horaFin.getMinutes().toString().padStart(2, "0");

    // Formatea el resultado
    return `${diaSemana} ${horas}:${minutos} - ${horasFin}:${minutosFin}`;
  }

  const getUserByRUT = async (rut) => {
    try {
      const res = await getUserByRUTAPI(rut);
      console.log(res[0]);
      setUser(res[0])
      if (res[0].rol === "Profesor") {
        // Hacer que se actualice el codigo para que muestre "presente" en asistencia
      } else {
        const timestamp = new Date().toISOString();
        const horario = formatFecha(timestamp);
        console.log(horario);
        const resp = await AddAcademicByQR(
          rut,
          res[0].nombre,
          sala,
          sede,
          timestamp,
          horario
        );
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (rut) {
      getUserByRUT(rut);
      console.log(rut, sala);
    }
  }, [rut]);
  return (
    <div className="w-full h-full text-center flex flex-col gap-2">
      <h2 className="text-xl">Hola {user.nombre}!</h2>
      <span className="text-lg">
        Su asistencia ha sido registrada en la sala: {sala}
      </span>
    </div>
  );
};

export { Userqr };
