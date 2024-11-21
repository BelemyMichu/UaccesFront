import { useState, useEffect } from "react";
import { leerExcelYSubir } from "../../functions/excelSubmitBase";
import * as XLSX from "xlsx";

import Ropita from "../../components/templates/Ropita";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";
import { CreateDialog } from "./CreateDialog";

import { getProgramacionAcademica } from "../../services/supabase/academic";

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
  const [createData, setCreateData] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = excelData.filter((row) => {
      // Revisa cada valor de las filas y busca coincidencias
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      leerExcelYSubir(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = new Uint8Array(event.target.result);
        const workbook = XLSX.read(fileData, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(jsonData);
        setExcelData(jsonData);
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
              className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
            >
              Nueva programación académica
            </button>
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors">
              Agregar un nuevo horario
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
                  className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors w-[100px]"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mostrar los datos leídos del archivo Excel */}
        {/* {excelData.length > 0 && (
          <div>
            <h2>Datos del archivo Excel:</h2>
            <ul>
              {excelData.map((row, index) => (
                <li key={index}>{JSON.stringify(row)}</li>
              ))}
            </ul>
          </div>
        )} */}
        {excelData.length > 0 ? (
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
                    Fecha inicio
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Fecha fin
                  </th>
                  <th className="p-4 border-b-2 border-gray-500 hover:bg-gray-200 duration-200">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
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
                      {row["Horario"]}
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
                      {row["Fecha Inicio"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      {row["Fecha Fin"]}
                    </td>
                    <td className="p-4 border-gray-500 hover:bg-gray-200 duration-200">
                      <button
                        onClick={() => handleEdit(row)}
                        className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors w-full mb-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(row)}
                        className="bg-purple-500 text-white px-2 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors w-full"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      {showCreate&& (
        <CreateDialog  closeDialog={setShowCreate} />
      )}
    </Ropita>
  );
}

export default LectorExcel;
