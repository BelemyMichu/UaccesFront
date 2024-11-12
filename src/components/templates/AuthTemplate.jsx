import React from "react";

function AuthTemplate({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-1 rounded-lg shadow-md w-full">
        <h2 className="text-7xl font-bold text-center mb-">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default AuthTemplate;
