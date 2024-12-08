import { useState, useEffect } from "react";
import Dialog from "../../../components/templates/Dialog";

import { editUser } from "../../../services/supabase/users";
import { hashPassword } from "../../../functions/bct";

const EditDialog = ({ initialData = {}, closeDialog }) => {
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    rol: "",
    correo: "",
    password: null, // Se usará para verificar si el usuario tiene contraseña
  });
  const [showPasswordInput, setShowPasswordInput] = useState(false); // Controla si mostramos el input

  const [originalRut, setOriginalRut] = useState(""); // Guardar el RUT original aquí

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
    if (!validateRUT(formData.rut)) {
      errors.push({ error: "El RUT ingresado no es válido" });
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        errors.push({
          error: "La contraseña debe tener al menos 6 caracteres",
        });
      } else {
        formData.password = hashPassword(formData.password);
      }
    }

    if (errors.length > 0) {
      setError(errors);
      return; // Detenemos la ejecución si hay errores
    }
    console.log("Datos del formulario con pass Hasheada:", formData);
    try {
      const res = await editUser(formData, originalRut);
      console.log(res);
      alert("Datos actualizados correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
      setShowPasswordInput(initialData.password === null); // Mostrar campo si no tiene contraseña
      setOriginalRut(initialData.rut); // Guardar el RUT original en el estado
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
            className="bg-custom-red text-white px-4 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export { EditDialog };
