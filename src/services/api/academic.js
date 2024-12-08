import axios from "axios";
import { config } from "../../config";

export const getProfeByQR = async (rut, edificio, sala) => {
  console.log(rut, edificio, sala);
  try {
    const response = await axios.post(
      `${config.backendApiUrl}/clases/get`,
      {
        rut: rut,
        edificio: edificio,
        sala: sala,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};