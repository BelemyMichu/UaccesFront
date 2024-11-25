import bcrypt from "bcryptjs";

// Función para encriptar un password.
export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Función para verificar un password.
export const verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};