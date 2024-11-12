import React, { useState } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de registro exitoso con RUT y Nombre
    setMessage({
      type: "success",
      text: `Registro exitoso para ${name} (RUT: ${rut}). Ahora puedes iniciar sesión.`,
    });

    // Opcional: Limpiar los campos de formulario después del registro
    setEmail("");
    setPassword("");
    setRut("");
    setName("");
  };

  return (
    <AuthTemplate title="Registrarse">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">RUT</label>
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md"
        >
          Registrarse
        </button>
        {message && (
          <p className="mt-4 text-center text-green-500">
            {message.text}
          </p>
        )}
      </form>
    </AuthTemplate>
  );
}

export default RegisterPage;
