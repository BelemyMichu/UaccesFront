import Dialog from "../../../components/templates/Dialog";
import { deleteAcademic } from "../../../services/supabase/academic";

const DeleteDialog = ({ data, closeDialog }) => {
  const handleDelete = async () => {
    try {
      const res = await deleteAcademic(data.id);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <div className="flex flex-col items-center justify-around h-full">
        <h2 className="text-xl font-semibold">
          Eliminar programación académica
        </h2>
        <div>
          <span className="font-semibold text-xl">
            ¿Estás seguro de que quieres eliminar este horario?
          </span>
        </div>
        <div className="flex flex-row items-center gap-20 my-3">
          <div className="flex flex-col">
            <span className="text-md">Facultad: {data.Facultad}</span>
            <span className="text-md">Campus: {data.Campus}</span>
            <span className="text-md">Periodo: {data.Periodo}</span>
            <span className="text-md">Curso: {data.Curso}</span>
          </div>
          <div className="flex flex-col">
            <p className="text-md">Jornada: {data.Jornada}</p>
            <span className="text-md">NRC: {data.NRC}</span>
            <span className="text-md">
              Nombre Profesor: {data["Nombre Profesor"]}
            </span>
            <span className="text-md">
              RUT Profesor: {data["RUT Profesor"]}
            </span>
            <span className="text-md">Sección: {data.Sección}</span>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          <button
            onClick={handleDelete}
            className="bg-custom-red text-white px-4 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors w-[150px]"
          >
            Si, eliminar
          </button>
          <button
            onClick={() => closeDialog(false)}
            className="bg-green-700 text-white px-4 py-2 font-semibold rounded-xl hover:bg-green-600 transition-colors w-[150px]"
          >
            No, cerrar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export { DeleteDialog };
