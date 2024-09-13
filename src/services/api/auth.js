import axios from "axios";

export const getUsersApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/auth/get-users"
    );
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log;
  }
};
