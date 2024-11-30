import { useState, useEffect } from "react";
import Dialog from "../../../components/templates/Dialog";

import { editAcademic } from "../../../services/supabase/academic";

const EditDialog = ({ initialData = {}, closeDialog }) => {
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
    "Hora Inicio": "",
    "Hora Fin": "",
    Sala: "",
    "Capacidad Sala": "",
    "Fecha Inicio": "",
    "Fecha Fin": "",
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
    console.log("Datos del formulario:", formData);
    try {
      const res = await editAcademic(formData);
      console.log(res);
      alert("Datos actualizados correctamente")
      window.location.reload();
    } catch (error) {
      alert("Error al actualizar los datos")
      console.log(error);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);
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
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 w-[600px] h-[600px] px-4 overflow-y-scroll"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Facultad</label>
          <input
            type="text"
            name="Facultad"
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
            value={formData.Modalidad}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Día</label>
          <input
            type="text"
            name="Día"
            value={formData["Día"]}
            placeholder="Lu, Ma, Mi, Ju, Vi, Sa"
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hora Inicio</label>
          <input
            type="text"
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
            type="text"
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
            value={formData["Capacidad Sala"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha inicio</label>
          <input
            type="date"
            name="Fecha Inicio"
            value={formData["Fecha Inicio"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha fin</label>
          <input
            type="date"
            name="Fecha Fin"
            value={formData["Fecha Fin"]}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 font-semibold rounded-xl hover:bg-purple-600 transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export { EditDialog };
