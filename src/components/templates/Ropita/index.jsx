import React, { useEffect, useState } from "react";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../../functions/LocalStorage";
import { useNavigate, Link } from "react-router-dom";
import userIcon from "../../../assets/user-icon.svg";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Ropita = ({ children, title = "", className = "" }) => {
  const [user, setUser] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Función para abrir el menú
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funcion para cerrar el menú
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeLocalStorage("user");
    navigate("/");
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  useEffect(() => {
    try {
      const user = getLocalStorage("user");
      !user ? navigate("/") : setUser(user);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }, []);
  return (
    <div className={`flex flex-col min-h-screen bg-light-purple ${className}`}>
      <header className="w-full text-black">
        <nav className="h-[80px] w-full flex justify-between items-center p-4 bg-purple-white">
          <div>
            <img
              className="w-[100%] h-[50px] object-containt"
              src="/UNAB_horizontal.png"
              alt="Logo UNAB"
            />
          </div>
          <div className="flex space-x-4 items-center">
            {user && user.rol === "Secretario" && (
              <ul className="flex space-x-4">
                <li>Gestión de usuarios</li>
                <li>Asistencia</li>
                <li>
                  <Link to={"/programacion-academica"}>
                    Programación academica
                  </Link>
                </li>
              </ul>
            )}

            {user && user.rol !== "Secretario" && (
              <ul className="flex space-x-4">
                <li>Gestión de salas</li>
                <li>Reportes</li>
              </ul>
            )}
            <span> | </span>
            <button
              id="navbar-menu"
              className="bg-main-white rounded-3xl text-center h-12"
              data-testid="navbar-menu-button"
              onClick={handleClick}
              aria-controls={open ? "navbar-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img className="h-[35px]" src={userIcon} alt="User Icon" />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .MuiPaper-root": {
                  margin: "0px 10px 0px 20px",
                  borderRadius: "12px",
                },
              }}
            >
              <MenuItem
                onClick={handleLogout}
                sx={{
                  width: "100px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "0px",
                }}
              >
                <span>Salir</span>
              </MenuItem>
            </Menu>
          </div>
        </nav>
        <h1 className="text-2xl font-normal text-left ml-2 mt-2">{title}</h1>
      </header>

      <main className="p-6 sm:max-lg:p-0">
        <div className="w-auto h-auto max-w-full mx-auto p-4">{children}</div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 - Uaccess: Sistema de Gestión de Salas</p>
      </footer>
    </div>
  );
};

export default Ropita;
