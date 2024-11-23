import { useState, useEffect, act } from "react";
import Ropita from "../../components/templates/Ropita";
import { getProgramacionAcademica } from "../../services/supabase/academic";

const Asistencias = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [todayCourses, setTodayCourses] = useState([]);
  const [teacherFilter, setTeacherFilter] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString("es-cl"));
  const [actualDay, setActualDay] = useState();
  const diasSemana = ["Dom", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

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
        curso["Nombre Profesor"]
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setTeacherFilter(profesorFiltrado);
    }
  };

  const handleFowardDate = (e) => {
    e.preventDefault();
    if (actualDay < diasSemana.length - 1) {
      const nuevoDia = actualDay + 1;
      const diaSig = diasSemana[nuevoDia];
      const cursosSig = excelData.filter((curso) =>
        curso.Horario.includes(diaSig)
      );
      setTodayCourses(cursosSig);
      setActualDay(nuevoDia);

      // Aplicar filtro de profesor si hay búsqueda activa
      if (searchTerm.trim() !== "") {
        const profesorFiltrado = cursosSig.filter((curso) =>
          curso["Nombre Profesor"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
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
      const cursosPrev = excelData.filter((curso) =>
        curso.Horario.includes(diaPrev)
      );
      setTodayCourses(cursosPrev);
      setActualDay(nuevoDia);

      // Aplicar filtro de profesor si hay búsqueda activa
      if (searchTerm.trim() !== "") {
        const profesorFiltrado = cursosPrev.filter((curso) =>
          curso["Nombre Profesor"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setTeacherFilter(profesorFiltrado);
      } else {
        setTeacherFilter([]);
      }
    }
  };

  const getData = async () => {
    try {
      const res = await getProgramacionAcademica();
      setExcelData(res);
      const hoy = new Date();
      const diaActual = diasSemana[hoy.getDay()];
      // Filtrar cursos que coincidan con el día actual
      const cursosHoy = res.filter((curso) =>
        curso.Horario.includes(diaActual)
      );
      setTodayCourses(cursosHoy); // Establecer los cursos del día
      setActualDay(hoy.getDay());
    } catch (error) {
      console.error("Error al obtener datos de programación académica:", error);
    }
  };

  useEffect(() => {
    getData(); // Obtener los datos al cargar el componente
  }, []);

  return (
    <>
      <Ropita title="Asistencias">
        <div className="w-full h-full">
          <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-row gap-4 items-center">
              <button
                onClick={handleBackDate}
                className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                disabled={actualDay === 1}
              >
                <span>Atrás</span>
              </button>
              <span className="font-semibold">
                Revisando día de la semana: {diasSemana[actualDay]}
              </span>
              <button
                onClick={handleFowardDate}
                className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                disabled={actualDay === 6}
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
                  className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                >
                  <span>Buscar</span>
                </button>
                <button
                  onClick={(e) => handleClearSearch(e)}
                  className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                >
                  <span>Limpiar</span>
                </button>
              </form>
              <span className="font-semibold">El día de hoy es: {date}</span>
            </div>
          </div>

          {/* Renderiza los cursos filtrados si hay filtro, si no, renderiza todos los cursos del día */}
          <div className="overflow-x-auto w-full rounded-lg">
            <table className="min-w-full bg-purple-white text-center rounded-lg">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Clase
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Nombre profesor
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Horario
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {(teacherFilter.length > 0 ? teacherFilter : todayCourses).map(
                  (row, index) => (
                    <tr key={index}>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row["Nombre Asignatura"]}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row["Nombre Profesor"]}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.Horario}
                      </td>
                      <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                        {row.estado === false ? (
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
