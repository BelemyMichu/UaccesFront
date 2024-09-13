import Dialog from "../../../components/templates/Dialog";
function CreateDialog({ closeDialog, open }) {
  return (
    <>
      {open && (
        <Dialog>
          <div>
            <button onClick={() => closeDialog()}>x</button>
          </div>
        </Dialog>
      )}
    </>
  );
}

export { CreateDialog };
