// src/components/templates/EditDialog.jsx
import React, { useState, useEffect } from "react";

const EditDialog = ({ open, closeDialog, sala, actualizarSala }) => {
  // Estado para mantener los valores editables de la sala
  const [salaEditada, setSalaEditada] = useState({
    id: sala?.id || "",
    tipo: sala?.tipo || "",
    capacidad: sala?.capacidad || 0,
  });

  // Actualizar el estado del formulario si la prop `sala` cambia
  useEffect(() => {
    if (sala) {
      setSalaEditada({
        id: sala.id,
        tipo: sala.tipo,
        capacidad: sala.capacidad,
      });
    }
  }, [sala]);

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaEditada((prev) => ({ ...prev, [name]: value }));
  };

  // Función para enviar la edición
  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarSala(salaEditada); // Llamada a la función que actualiza la sala
    closeDialog(); // Cierra el diálogo
  };

  // Renderizado condicional: si no está abierto, no muestra nada
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Editar Sala</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">ID</label>
            <input
              type="text"
              name="id"
              value={salaEditada.id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tipo</label>
            <input
              type="text"
              name="tipo"
              value={salaEditada.tipo}
              onChange={handleChange}
              placeholder="Ejemplo: Aula, Laboratorio"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Capacidad
            </label>
            <input
              type="number"
              name="capacidad"
              value={salaEditada.capacidad}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeDialog}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDialog;
