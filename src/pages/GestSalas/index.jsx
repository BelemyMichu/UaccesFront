import Ropita from "../../components/templates/Ropita";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"; 

export default function GestSalas() {
    
  return (
    <Ropita title="Gestion de Salas">
      <div className="min-h-screen flex flex-col items-center py-12">
        <div className="bg-purple-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Gestión de Salas
          </h1>
        </div>
      </div>
    </Ropita>
  );
}
