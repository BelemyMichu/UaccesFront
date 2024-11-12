import Dialog from "../../../components/templates/Dialog";
import React, { useState } from "react";

function CreateDialog({ closeDialog, open }) {
  return (
    <>
      {open && (
        <Dialog>
          <div>
            <button onClick={() => closeDialog()}>x</button>
            <h2>Contenido del Diálogo</h2>
            <textarea placeholder="Escribe aquí..." rows="5" style={{ width: '100%' }}></textarea>
          </div>
        </Dialog>
      )}
    </>
  );
}

export { CreateDialog };
