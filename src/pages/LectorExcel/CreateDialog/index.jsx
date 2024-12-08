import { useState } from "react";
import Dialog from "../../../components/templates/Dialog";

import { addAcademic } from "../../../services/supabase/academic";
import { getUserByRUTAPI } from "../../../services/supabase/users";

function CreateDialog({ closeDialog }) {
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    Facultad: "",
    Campus: "",
    Periodo: "",
    Curso: "",
    Sección: "",
    Jornada: "",
    NRC: "",
    "Nombre Profesor": "",
    "RUT Profesor": "",
    "Nombre Asignatura": "",
    "Tipo Actividad": "",
    Modalidad: "",
    Día: "",
    "Hora Inicio": "00:00:00",
    "Hora Fin": "00:00:00",
    Sala: "",
    "Capacidad Sala": "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "RUT Profesor" ? value.toUpperCase() : value, // Asegura mayúsculas
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let errors = [];

    if (!validateRUT(formData["RUT Profesor"])) {
      errors.push({ error: "El RUT ingresado no es válido" });
    }

    if (formData["Hora Fin"] < formData["Hora Inicio"]) {
      errors.push({
        error: "La hora de finalización no puede ser menor a la inicial",
      });
    }

    if (formData["Fecha Fin"] < formData["Fecha Inicio"]) {
      errors.push({
        error: "La fecha final no puede ser menor a la fecha de inicio",
      });
    }

    if (errors.length > 0) {
      setError(errors);
      return; // Detenemos la ejecución si hay errores
    }
    try {
      const userRes = await getUserByRUTAPI(formData["RUT Profesor"]);
      if (userRes.length > 0) {
        const res = await addAcademic(formData);
        console.log(res);
        alert("Datos guardados correctamente");
        window.location.reload();
      } else {
        setError("RUT no existente");
      }
    } catch (error) {
      alert("Error al guardar los datos");
      console.log(error);
    }
  };

  return (
    <Dialog>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Formulario Académico</h2>
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
        className="grid grid-cols-2 gap-4 w-[600px] min-w-[200px] h-[600px] px-4 overflow-y-scroll"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Facultad</label>
          <input
            type="text"
            name="Facultad"
            placeholder="INGE"
            value={formData.Facultad}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Campus</label>
          <input
            type="text"
            name="Campus"
            placeholder="ANTONIO VARAS"
            value={formData.Campus}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Periodo</label>
          <input
            type="text"
            name="Periodo"
            placeholder="202410"
            value={formData.Periodo}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Curso</label>
          <input
            type="text"
            name="Curso"
            placeholder="550"
            value={formData.Curso}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sección</label>
          <input
            type="text"
            name="Sección"
            placeholder="1"
            value={formData.Sección}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Jornada</label>
          <input
            type="text"
            name="Jornada"
            placeholder="REGULAR"
            value={formData.Jornada}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">NRC</label>
          <input
            type="text"
            name="NRC"
            placeholder="0000"
            value={formData.NRC}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre Profesor
          </label>
          <input
            type="text"
            name="Nombre Profesor"
            placeholder="Nombre del Profesor"
            value={formData["Nombre Profesor"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">RUT Profesor</label>
          <input
            type="text"
            name="RUT Profesor"
            placeholder="12345678-9"
            value={formData["RUT Profesor"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre Asignatura
          </label>
          <input
            type="text"
            name="Nombre Asignatura"
            placeholder="Nombre de la asignatura"
            value={formData["Nombre Asignatura"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Tipo de Actividad
          </label>
          <input
            type="text"
            name="Tipo Actividad"
            placeholder="Teorico"
            value={formData["Tipo Actividad"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Modalidad</label>
          <input
            type="text"
            name="Modalidad"
            placeholder="Presencial"
            value={formData.Modalidad}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Día</label>
          <select
            name="Día"
            value={formData["Día"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          >
            <option value="">Selecciona un día</option>
            <option value="Lu">Lunes</option>
            <option value="Ma">Martes</option>
            <option value="Mi">Miércoles</option>
            <option value="Ju">Jueves</option>
            <option value="Vi">Viernes</option>
            <option value="Sa">Sábado</option>
            <option value="Do">Domingo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hora Inicio</label>
          <input
            type="time"
            name="Hora Inicio"
            placeholder="HH:MM:SS"
            value={formData["Hora Inicio"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hora Fin</label>
          <input
            type="time"
            name="Hora Fin"
            placeholder="HH:MM:SS"
            value={formData["Hora Fin"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Edificio</label>
          <input
            type="text"
            name="Edificio"
            placeholder="A1"
            value={formData.Edificio}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sala</label>
          <input
            type="text"
            name="Sala"
            placeholder="301"
            value={formData.Sala}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Capacidad de la sala
          </label>
          <input
            type="number"
            name="Capacidad Sala"
            placeholder="10"
            value={formData["Capacidad Sala"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-custom-red text-white px-4 py-2 font-semibold rounded-xl hover:bg-custom-red-2 transition-colors"
          >
            Crear
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export { CreateDialog };
