import axios from "axios";
import { config } from "../../config";

export const getUsersApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/auth/get-users"
    );
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${config.backendApiUrl}/auth/login`, {
      email,
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error("Error en la respuesta del servidor:", error.response.data);
      throw error.response; // Lanza el error para que pueda manejarse en el componente
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error("Sin respuesta del servidor:", error.request);
      throw new Error("No se pudo conectar con el servidor.");
    } else {
      // Otro tipo de error
      console.error("Error desconocido:", error.message);
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};
