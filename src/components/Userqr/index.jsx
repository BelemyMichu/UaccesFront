import { useEffect, useState } from "react";

import { getUserByRUTAPI } from "../../services/supabase/users";
import { createAsistencia } from "../../services/supabase/asistencia";
import { getAcademicByRut } from "../../services/supabase/academic";

const Userqr = ({ rut, sala, sede }) => {
  const [user, setUser] = useState([]);

  const formatFecha = () => {
    const dateNow = new Date();
  
    const diasSemana = ["Dom", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
    const diaSemana = diasSemana[dateNow.getDay()]; // Obtiene el nombre del día
  
    // Asegura que las horas, minutos y segundos tengan dos dígitos
    const horas = String(dateNow.getHours()).padStart(2, '0'); // Hora (00-23)
    const minutos = String(dateNow.getMinutes()).padStart(2, '0'); // Minutos (00-59)
    const segundos = String(dateNow.getSeconds()).padStart(2, '0'); // Segundos (00-59)
  
    const timeNow = `${horas}:${minutos}:${segundos}`; // Formato "HH:mm:ss"
    
    const dayTime = {
      diaSemana: diaSemana,
      hora: timeNow
    };
  
    return dayTime;
  }
  

  const getUserByRUT = async (rut) => {
    try {
      const res = await getUserByRUTAPI(rut);
      if (res.length === 0) {
        alert("Usuario no encontrado");
        window.location.reload();
      }
      console.log(res[0]);
      setUser(res[0])
      if (res[0].rol === "Profesor") {
        const resAcad = await getAcademicByRut(rut, sala, sede);
        resAcad && await createAsistencia({
          rut: rut,
          nombre: res[0].nombre,
          rol: res[0].rol,
          nrc: resAcad[0].NRC,
          asignatura: resAcad[0]["Nombre Asignatura"],
          sede: sede,
          sala: sala,
          dia: resAcad[0].Día,
          hora_inicio: resAcad[0]["Hora Inicio"],
          hora_final: resAcad[0]["Hora Fin"],
          presente: true
        })
      } else {
        const horario = formatFecha();
        console.log(horario);
        const resp = await createAsistencia(
          {
            rut: rut,
            nombre: res[0].nombre,
            rol: res[0].rol,
            nrc: null,
            asignatura: null,
            sede: sede,
            sala: sala,
            dia: horario.diaSemana,
            hora_inicio: horario.hora,
            hora_final: null,
            presente: true
          }
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
