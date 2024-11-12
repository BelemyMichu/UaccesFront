// src/components/templates/Ropita.jsx
import React from "react";

const Ropita = ({ children, title = "Historial de Salas", className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-100 ${className}`}>
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-xl font-bold text-center">{title}</h1>
      </header>

      <main className="p-6">
        <div className="max-w-5xl mx-auto bg-white rounded shadow-md p-4">
          {children}
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-6">
        <p>&copy; 2024 - Sistema de Gestión de Salas</p>
      </footer>
    </div>
  );
};

export default Ropita;
