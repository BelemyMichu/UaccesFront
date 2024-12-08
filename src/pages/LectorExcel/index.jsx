import { useState, useEffect } from "react";
import { leerExcelYSubir } from "../../functions/excelSubmitBase";
import * as XLSX from "xlsx";

import Ropita from "../../components/templates/Ropita";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";
import { CreateDialog } from "./CreateDialog";

import {
  getProgramacionAcademica,
  deleteAllAcademic,
} from "../../services/supabase/academic";

function LectorExcel() {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [showFileUpload, setShowFileUpload] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [showCreate, setShowCreate] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Número de filas por página

  // Calcular datos mostrados por página
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Manejar búsqueda
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = excelData.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reinicia a la primera página
  };

  // Manejar cambio de página
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const convertirTiempo = (valor) => {
    if (!valor || isNaN(valor)) return null; // Maneja valores vacíos o inválidos
    const totalSegundos = Math.round(valor * 24 * 60 * 60);
    const horas = Math.floor(totalSegundos / 3600)
      .toString()
      .padStart(2, "0");
    const minutos = Math.floor((totalSegundos % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const segundos = (totalSegundos % 60).toString().padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  const handleFileUpload = () => {
    if (file) {
      leerExcelYSubir(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const byteData = new Uint8Array(event.target.result);
        const workbook = XLSX.read(byteData, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // Asegúrate de separar encabezados y datos correctamente
        const headers = jsonData[0]; // Primera fila como encabezados
        const rows = jsonData.slice(1); // Resto de filas como datos

        // Función para convertir decimal a formato HH:MM:SS
        const decimalToTime = (decimal) => {
          const totalSeconds = Math.round(decimal * 24 * 3600);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        };

        // Prepara los datos para subir a Supabase
        const dataToInsert = rows.map((row) => {
          let obj = {};
          headers.forEach((header, index) => {
            let value =
              row[index] !== undefined ? row[index].toString().trim() : null;

            // Si el encabezado sugiere que es un tiempo, convierte el valor decimal
            if (
              header.toLowerCase().includes("hora") && // Detecta columnas de tiempo
              value &&
              !isNaN(value) // Verifica si es un número
            ) {
              value = decimalToTime(parseFloat(value)); // Convierte el valor decimal a HH:MM:SS
            }

            // Si el valor es una fecha, lo formatea (si aplica)
            if (header.toLowerCase().includes("fecha") && value) {
              value = formatDate(value);
            }

            obj[header] = value;
          });
          return obj;
        });

        // Filtra filas con fechas inválidas
        const validData = dataToInsert.filter((row) => {
          return Object.values(row).every((val) => val !== null);
        });

        setExcelData(validData);
        alert("Datos cargados correctamente");
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEdit = (row) => {
    setEditData(row);
    setShowEdit(true);
  };

  const handleDelete = async (row) => {
    setShowDelete(true);
    setDeleteData(row);
  };

  const handleDeleteAll = async () => {
    try {
      const res = await deleteAllAcademic();
      console.log(res);
      alert("Datos eliminados correctamente");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error al eliminar toda la programación académica");
    }
  };

  const getData = async () => {
    try {
      const res = await getProgramacionAcademica();
      setExcelData(res);
      setShowFileUpload(false);
    } catch (error) {
      console.error("Error al obtener datos de programacion_academica:", error);
    }
  };

  useEffect(() => {
    setFilteredData(excelData);
  }, [excelData]);

  useEffect(() => {
    getData();
    file && setFile(null);
    fileName && setFileName("");
  }, []);
  return (
    <Ropita title="Programación académica">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center rounded-lg w-full p-2 flex justify-between sm:max-lg:flex-col">
          <div className="flex gap-4 sm:max-lg:flex-col">
            <button
              onClick={() => setShowFileUpload(!showFileUpload)}
              className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
            >
              Nueva programación académica
            </button>
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
            >
              Agregar un nuevo horario
            </button>
            <button
              onClick={() => handleDeleteAll()}
              className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
            >
              Eliminar toda la programación académica
            </button>
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg p-2 w-[300px] sm:max-lg:w-full sm:max-lg:mt-4"
          />
        </div>
        {showFileUpload && (
          <div className="flex flex-col items-center justify-center bg-purple-white rounded-xl gap-4 p-2 m-2 w-[400px]">
            <h1 className="font-semibold text-xl">
              Subir programación académica
            </h1>
            <input
              type="file"
              name="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              className="text-black px-4 py-2 underline decoration-solid cursor-pointer"
              htmlFor="fileInput"
            >
              Elegir un archivo desde tu computador
            </label>
            {fileName && (
              <div className="flex flex-col text-center items-center gap-4">
                <p>Archivo cargado: {fileName}</p>
                <button
                  onClick={handleFileUpload}
                  className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors w-[100px]"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>
        )}

        {currentRows.length > 0 ? (
          <div className="overflow-x-auto w-full rounded-lg">
            <table className="min-w-full bg-purple-white text-center rounded-lg">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Facultad
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Campus
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Periodo
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Curso
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Sección
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Jornada
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    NRC
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Nombre Profesor
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    RUT Profesor
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Nombre Asignatura
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Tipo de Actividad
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Modalidad
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Horario
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Edificio
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Sala
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Capacidad de la sala
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index}>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Facultad"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Campus"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Periodo"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Curso"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Sección"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Jornada"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["NRC"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Nombre Profesor"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["RUT Profesor"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Nombre Asignatura"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Tipo Actividad"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Modalidad"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {`${row["Día"]} ${row["Hora Inicio"]} - ${row["Hora Fin"]}`}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Edificio"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Sala"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Capacidad Sala"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      <button
                        onClick={() => handleEdit(row)}
                        className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors w-full mb-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(row)}
                        className="bg-custom-red text-white px-2 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors w-full"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Controles de paginación */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Siguiente
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center rounded-lg w-full p-4">
            <span>No hay programación academica para mostrar</span>
          </div>
        )}
      </div>
      {showEdit && (
        <EditDialog initialData={editData} closeDialog={setShowEdit} />
      )}
      {showDelete && (
        <DeleteDialog data={deleteData} closeDialog={setShowDelete} />
      )}
      {showCreate && <CreateDialog closeDialog={setShowCreate} />}
    </Ropita>
  );
}

export default LectorExcel;
