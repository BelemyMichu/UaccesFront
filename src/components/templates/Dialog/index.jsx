import "./dialog.css";
function Dialog({ children }) {
  return (
    <div className="dialog-conteiner">
      <div className="dialog-real">{children}</div>
    </div>
  );
}

export default Dialog;
