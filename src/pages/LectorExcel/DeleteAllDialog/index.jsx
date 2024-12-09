import Dialog from "../../../components/templates/Dialog";
import { deleteAllAcademic } from "../../../services/supabase/academic";

const DeleteAllDialog = ({ closeDialog }) => {
  const handleDelete = async () => {
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

  return (
    <Dialog>
      <div className="flex flex-col items-center justify-around h-full">
        <h2 className="text-xl font-semibold">
          Eliminar programación académica
        </h2>
        <div>
          <span className="font-semibold text-xl">
            ¿Estás seguro de que quieres eliminar toda la programación
            académica?
          </span>
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

export { DeleteAllDialog };
