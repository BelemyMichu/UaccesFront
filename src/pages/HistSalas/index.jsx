import Ropita from "../../components/templates/Ropita";
import { useState, useEffect } from "react";
import { CreateDialog } from "./createDialog";
import { getUsersApi } from "../../services/api/auth";
import EditDialog from "../../components/templates/EditDialog"; // Importa el nuevo template

const HistSalas = () => {
  const HistSalas = () => {
    const [openEdit, setOpenEdit] = useState(false); // Controla el diálogo de edición
    const [salaSeleccionada, setSalaSeleccionada] = useState(null); // Sala actual a editar
  
    // Función para abrir el diálogo con la sala seleccionada
    const abrirEditarSala = (sala) => {
      setSalaSeleccionada(sala);
      setOpenEdit(true);
    };
  
    // Función para actualizar la sala
    const actualizarSala = (salaEditada) => {
      setSalas((prevSalas) =>
        prevSalas.map((sala) =>
          sala.id === salaEditada.id ? salaEditada : sala
        )
      );
    };
  
    return (
      <>
        <table>
          <tbody>
            {salas.map((sala) => (
              <tr key={sala.id}>
                <td>{sala.professor}</td>
                <td>{sala.subject}</td>
                <td>
                  <button onClick={() => abrirEditarSala(sala)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <EditDialog
          open={openEdit}
          closeDialog={() => setOpenEdit(false)}
          sala={salaSeleccionada}
          actualizarSala={actualizarSala}
        />
      </>
    );
  };
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [salas, setSalas] = useState([]);

  const Odialog = () => setOpen(true);
  const Cdialog = () => setOpen(false);

  const MostrarUsers = async () => {
    try {
      const res = await getUsersApi();
      setUsers(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const agregarSala = (nuevaSala) => {
    setSalas((prev) => [...prev, nuevaSala]);
  };

  useEffect(() => {
    MostrarUsers();
  }, []);

  return (
    <Ropita title="Historial de Salas">
      <button
        onClick={Odialog}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Dialog
      </button>

      <table className="border-collapse border border-gray-400 w-full mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Professor</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Classroom</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{sala.professor}</td>
              <td className="border px-4 py-2">{sala.subject}</td>
              <td className="border px-4 py-2">{sala.classroom}</td>
              <td className="border px-4 py-2">{sala.date}</td>
              <td className="border px-4 py-2">{sala.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CreateDialog open={open} closeDialog={Cdialog} agregarSala={agregarSala} />
    </Ropita>
  );
};

export default HistSalas;
