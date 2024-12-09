import { useState, useEffect } from "react";
import Dialog from "../../../components/templates/Dialog";

import { editAcademic } from "../../../services/supabase/academic";

const EditDialog = ({ initialData = {}, closeDialog }) => {
  const [loading, setLoading] = useState(false);
  const [oldRut, setOldRut] = useState("");
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    Facultad: "INGE",
    Campus: "ANTONIO VARAS",
    Periodo: "202410",
    Curso: "",
    Sección: "",
    Jornada: "REGULAR",
    NRC: "",
    "Nombre Profesor": "",
    "RUT Profesor": "",
    "Nombre Asignatura": "",
    "Tipo Actividad": "Teórico",
    Modalidad: "Presencial",
    Día: "",
    "Hora Inicio": "",
    "Hora Fin": "",
    Edificio: "A1",
    Sala: "",
    "Capacidad Sala": "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "RUT Profesor" ? value.toUpperCase() : value,
    });
  };

  const validateRUT = (rut) => {
    const cleanRUT = rut.replace(/[^\dkK]/g, "").toUpperCase();
    const body = cleanRUT.slice(0, -1);
    const dv = cleanRUT.slice(-1);
    if (body.length < 7 || isNaN(body)) return false;

    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedDV = 11 - (sum % 11);
    const formattedDV =
      expectedDV === 11 ? "0" : expectedDV === 10 ? "K" : `${expectedDV}`;
    return dv === formattedDV;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];

    if (!validateRUT(formData["RUT Profesor"])) {
      errors.push({ error: "El RUT ingresado no es válido" });
    }

    if (formData["Hora Fin"] < formData["Hora Inicio"]) {
      errors.push({
        error: "La hora de finalización no puede ser menor a la inicial",
      });
    }

    if (errors.length > 0) {
      setError(errors);
      return;
    }

    console.log("Datos del formulario:", formData);
    try {
      const res = await editAcademic(formData, oldRut);
      console.log(res);
      alert("Datos actualizados correctamente");
      window.location.reload();
    } catch (error) {
      alert("Error al actualizar los datos");
      console.log(error);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
    setOldRut(initialData["RUT Profesor"]);
  }, [initialData]);

  return (
    <Dialog>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Editar Académico</h2>
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
        className="grid grid-cols-2 gap-4 w-[600px] h-[600px] px-4 overflow-y-scroll"
      >
        <div>
          <label>Facultad</label>
          <input
            type="text"
            value="INGE"
            disabled
            placeholder="INGE"
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label>Campus</label>
          <input
            type="text"
            value="ANTONIO VARAS"
            disabled
            placeholder="ANTONIO VARAS"
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label>Periodo</label>
          <select
            name="Periodo"
            value={formData.Periodo}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          >
            <option value="202410">202410</option>
            <option value="202420">202420</option>
          </select>
        </div>
        <div>
          <label>Curso</label>
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
          <label>Sección</label>
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
          <label>Jornada</label>
          <input
            type="text"
            value="REGULAR"
            disabled
            placeholder="REGULAR"
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label>NRC</label>
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
          <label>Nombre Profesor</label>
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
          <label>RUT Profesor</label>
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
          <label>Nombre Asignatura</label>
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
          <label>Tipo de Actividad</label>
          <select
            name="Tipo Actividad"
            value={formData["Tipo Actividad"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          >
            <option value="Teórico">Teórico</option>
            <option value="Taller">Taller</option>
          </select>
        </div>
        <div>
          <label>Modalidad</label>
          <input
            type="text"
            value="Presencial"
            disabled
            placeholder="Presencial"
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label>Día</label>
          <select
            name="Día"
            value={formData.Día}
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
          <label>Hora Inicio</label>
          <select
            name="Hora Inicio"
            value={formData["Hora Inicio"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          >
            {[
              "08:30:00",
              "09:25:00",
              "10:20:00",
              "11:15:00",
              "12:10:00",
              "13:05:00",
              "14:00:00",
              "14:55:00",
              "15:50:00",
              "16:45:00",
              "17:40:00",
              "18:35:00",
              "19:30:00",
              "20:25:00",
            ].map((hora) => (
              <option key={hora} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hora Fin</label>
          <select
            name="Hora Fin"
            value={formData["Hora Fin"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          >
            {[
              "09:15:00",
              "10:10:00",
              "12:00:00",
              "12:55:00",
              "13:50:00",
              "14:45:00",
              "15:40:00",
              "16:35:00",
              "17:30:00",
              "18:25:00",
              "19:20:00",
              "20:15:00",
              "21:10:00",
            ].map((hora) => (
              <option key={hora} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Edificio</label>
          <select
            name="Edificio"
            value={formData.Edificio}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
          </select>
        </div>
        <div>
          <label>Sala</label>
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
          <label>Capacidad Sala</label>
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
            Actualizar
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export { EditDialog };
