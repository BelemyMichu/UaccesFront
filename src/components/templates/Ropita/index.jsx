import Nav from "../../Nav";
function Ropita({ children }) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Ropita;
