import { useState, useEffect } from "react";
import Dialog from "../../../components/templates/Dialog";

import { editUser } from "../../../services/supabase/users";
import { hashPassword } from "../../../functions/bct";

const EditDialog = ({ initialData = {}, closeDialog }) => {
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    rol: "",
    correo: "",
    password: null, // Se usará para verificar si el usuario tiene contraseña
  });

  const [showPasswordInput, setShowPasswordInput] = useState(false); // Controla si mostramos el input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password) {
      formData.password = hashPassword(formData.password);
    }
    console.log("Datos del formulario con pass Hasheada:", formData);
    try {
      const res = await editUser(formData);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
      setShowPasswordInput(initialData.password === null); // Mostrar campo si no tiene contraseña
    }
  }, [initialData]);

  return (
    <Dialog>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Editar Usuario</h2>
        <span
          className="text-xl cursor-pointer font-semibold"
          onClick={() => closeDialog(false)}
        >
          X
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 w-[400px]"
      >
        <div>
          <label className="block text-sm font-medium mb-1">RUT</label>
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rol</label>
          <input
            type="text"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Correo</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          {showPasswordInput ? (
            <div>
              <label className="block text-sm font-medium mb-1">
                Crear contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>
          ) : (
            <span>Usuario posee contraseña, para cambiarla acuda a TI.</span> 
          )}
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export { EditDialog };
