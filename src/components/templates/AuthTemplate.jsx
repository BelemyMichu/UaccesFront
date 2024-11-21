import React from "react";

function AuthTemplate({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-full">
        {children}
      </div>
    </div>
  );
}

export default AuthTemplate;
