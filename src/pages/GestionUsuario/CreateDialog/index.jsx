import { useState } from "react";
import Dialog from "../../../components/templates/Dialog";

import { addUser } from "../../../services/supabase/users";
import { hashPassword } from "../../../functions/bct";

function CreateDialog({ closeDialog }) {
  const [error, setError] = useState([]);
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
      [name]: name === "rut" ? value.toUpperCase() : value, // Asegura mayúsculas
    });
  };
  

  const validateRUT = (rut) => {
    // Eliminar puntos y guiones
    const cleanRUT = rut.replace(/[^\dkK]/g, "").toUpperCase();

    // Separar número y dígito verificador
    const body = cleanRUT.slice(0, -1);
    const dv = cleanRUT.slice(-1);
    console.log(body, dv);

    // Validar largo
    if (body.length < 7 || isNaN(body)) return false;

    // Calcular dígito verificador esperado
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedDV = 11 - (sum % 11);
    const formattedDV =
      expectedDV === 11 ? "0" : expectedDV === 10 ? "K" : `${expectedDV}`;

    // Comparar con el dígito verificador ingresado
    return dv === formattedDV;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];

    console.log("Datos del formulario sin contraseña hasheada:", formData);

    if (!validateRUT(formData.rut)) {
      errors.push({ error: "El RUT ingresado no es válido" });
    }

    // Validar que la contraseña no esté vacía
    if (!formData.password) {
      errors.push({ error: "La contraseña es obligatoria" });
    } else if (formData.password.length < 6) {
      errors.push({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Hashear la contraseña antes de enviarla
    const hashedPassword = hashPassword(formData.password);
    const dataToSend = { ...formData, password: hashedPassword };

    if (errors.length > 0) {
      setError(errors);
      return; // Detenemos la ejecución si hay errores
    }

    try {
      const res = await addUser(dataToSend);

      console.log("Usuario creado exitosamente:", res);
      //window.location.reload();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      if (error.supabaseCode === 23505) {
        errors = [{ error: error.message }];
        setError(errors);
      }
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
      {error.length > 0 &&
        error.map((err, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center bg-red-200 p-2 rounded-md mb-4"
          >
            <span>{err.error}</span>
            <button onClick={() => setError([])}>X</button>
          </div>
        ))}
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
            className="bg-custom-red text-white px-4 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
          >
            Registrar Usuario
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export { CreateDialog };
