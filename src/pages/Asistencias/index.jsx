import { useState, useEffect, act } from "react";
import Ropita from "../../components/templates/Ropita";
import { getTodayProfes } from "../../services/supabase/academic";
import {
  createAsistencia,
  getAsistenciaByWeek,
} from "../../services/supabase/asistencia";

import Loading from "../../components/templates/Loading";

const Asistencias = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [todayCourses, setTodayCourses] = useState([]);
  const [teacherFilter, setTeacherFilter] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString("es-cl"));
  const [actualDay, setActualDay] = useState();
  const diasSemana = ["Dom", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  const getAusentes = async (e) => {
    e.preventDefault();
    try {
      const res = await getTodayProfes(diasSemana[new Date().getDay()]);
      console.log(new Date());
      if (res.length > 0) {
        const updatedRes = res.map((profe) => {
          return {
            rut: profe["RUT Profesor"],
            nombre: profe["Nombre Profesor"],
            rol: "Profesor",
            asignatura: profe["Nombre Asignatura"],
            nrc: profe["NRC"],
            sala: profe["Sala"],
            sede: profe["Edificio"],
            dia: profe["Día"],
            presente: false,
          };
        });
        const resAsist = await createAsistencia(updatedRes);
        console.log(resAsist);
      }
    } catch (error) {
      console.error("Error al obtener asistencias:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleClearSearch = (e) => {
    e.preventDefault();
    setSearchTerm(""); // Reinicia el término de búsqueda
    setTeacherFilter([]); // Limpia el filtro aplicado
  };

  const handleTeacherFilter = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setTeacherFilter([]); // Si no hay búsqueda, limpia el filtro
    } else {
      const profesorFiltrado = todayCourses.filter((curso) =>
        curso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTeacherFilter(profesorFiltrado);
    }
  };

  const handleFowardDate = (e) => {
    e.preventDefault();
    if (actualDay < diasSemana.length - 1) {
      const nuevoDia = actualDay + 1;
      const diaSig = diasSemana[nuevoDia];
      const cursosSig = excelData.filter(
        (curso) => curso.dia && curso.dia.includes(diaSig)
      );
      setTodayCourses(cursosSig);
      setActualDay(nuevoDia);

      // Aplicar filtro de profesor si hay búsqueda activa
      if (searchTerm.trim() !== "") {
        const profesorFiltrado = cursosSig.filter((curso) =>
          curso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTeacherFilter(profesorFiltrado);
      } else {
        setTeacherFilter([]);
      }
    }
  };

  const handleBackDate = (e) => {
    e.preventDefault();
    if (actualDay > 0) {
      const nuevoDia = actualDay - 1;
      const diaPrev = diasSemana[nuevoDia];
      const cursosPrev = excelData.filter(
        (curso) => curso.dia && curso.dia.includes(diaPrev)
      );
      setTodayCourses(cursosPrev);
      setActualDay(nuevoDia);

      // Aplicar filtro de profesor si hay búsqueda activa
      if (searchTerm.trim() !== "") {
        const profesorFiltrado = cursosPrev.filter((curso) =>
          curso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTeacherFilter(profesorFiltrado);
      } else {
        setTeacherFilter([]);
      }
    }
  };

  const getData = async () => {
    try {
      const res = await getAsistenciaByWeek();
      console.log(res);
      setExcelData(res);

      const hoy = new Date();
      const diaActual = diasSemana[hoy.getDay()];

      // Filtrar cursos que coincidan con el día actual (con validación)
      const cursosHoy = res.filter(
        (curso) => curso.dia && curso.dia.includes(diaActual)
      );

      setTodayCourses(cursosHoy);
      setActualDay(hoy.getDay());
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener datos de programación académica:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(); // Obtener los datos al cargar el componente
  }, []);

  return (
    <>
      <Ropita title="Asistencias">
      {loading && <Loading />}
        <div className="w-full h-full">
          <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-row gap-4 items-center">
              <button
                onClick={handleBackDate}
                className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
              >
                <span>Atrás</span>
              </button>
              <span className="font-semibold">
                Revisando día de la semana: {diasSemana[actualDay]}
              </span>
              <button
                onClick={handleFowardDate}
                className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
              >
                <span>Adelante</span>
              </button>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <span className="font-semibold">Nombre profesor: </span>
              <form className="flex flex-row gap-4">
                <input
                  type="text"
                  placeholder="Buscar horario de profesor..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border border-gray-300 rounded-lg p-2 w-[300px] sm:max-lg:w-full sm:max-lg:mt-4"
                />
                <button
                  onClick={handleTeacherFilter}
                  className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
                >
                  <span>Buscar</span>
                </button>
                <button
                  onClick={(e) => handleClearSearch(e)}
                  className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
                >
                  <span>Limpiar</span>
                </button>
              </form>
              <button
                onClick={getAusentes}
                className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
              >
                <span>Marcar ausentes</span>
              </button>
              <span className="font-semibold">El día de hoy es: {date}</span>
            </div>
          </div>

          {/* Renderiza los cursos filtrados si hay filtro, si no, renderiza todos los cursos del día */}
          <div className="overflow-x-auto w-full rounded-lg">
            <table className="min-w-full bg-purple-white text-center rounded-lg">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Rut
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Nombre
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Rol
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Clase
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    NRC
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Edifico
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Sala
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Hora de ingreso
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Asistencia
                  </th>
                </tr>
              </thead>
              <tbody>
                {(teacherFilter.length > 0 ? teacherFilter : todayCourses).map(
                  (row, index) => (
                    <tr key={index}>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.rut || "No asignada"}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.nombre || "No asignado"}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.rol || "No asignado"}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.asignatura || "No asignada"}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.nrc || "No asignado"}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.sala}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.sede}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {`${row.dia} - ${row.hora_inicio || "Sin hora"}`}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.presente === false ? (
                          <p>Ausente</p>
                        ) : (
                          <p>Presente</p>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Ropita>
    </>
  );
};

export default Asistencias;
