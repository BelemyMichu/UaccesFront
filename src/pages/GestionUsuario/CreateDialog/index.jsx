import { useState } from "react";
import Dialog from "../../../components/templates/Dialog";

import { addUser } from "../../../services/supabase/users";
import { hashPassword } from "../../../functions/bct";

function CreateDialog({ closeDialog }) {
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    rol: "",
    correo: "",
    password: "", // Campo obligatorio para la creación
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del formulario sin contraseña hasheada:", formData);

    // Validar que la contraseña no esté vacía
    if (!formData.password) {
      alert("La contraseña es obligatoria.");
      return;
    }

    // Hashear la contraseña antes de enviarla
    const hashedPassword = hashPassword(formData.password);
    const dataToSend = { ...formData, password: hashedPassword };

    try {
      const res = await addUser(dataToSend);
      console.log("Usuario creado exitosamente:", res);
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <Dialog>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Crear Usuario</h2>
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
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-custom-red text-white px-4 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
          >
            Registrar Usuario
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export { CreateDialog };
