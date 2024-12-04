import Dialog from "../../../components/templates/Dialog";
import { deleteUser } from "../../../services/supabase/users";

const DeleteDialog = ({ data, closeDialog }) => {
  const handleDelete = async () => {
    try {
      const res = await deleteUser(data.rut);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <div className="flex flex-col items-center justify-around h-full">
        <h2 className="text-xl font-semibold">Eliminar usuario</h2>
        <div>
          <span className="font-semibold text-xl">
            ¿Estás seguro de que quieres eliminar a este usuario?
          </span>
        </div>
        <div className="flex flex-row items-center gap-20 my-3">
          <div className="flex flex-col">
            <span className="text-md">Nombre: {data.nombre}</span>
            <span className="text-md">RUT: {data.rut}</span>
            <span className="text-md">Rol: {data.rol}</span>
            <span className="text-md">
              Correo: {data.correo || "No posee correo"}
            </span>
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
