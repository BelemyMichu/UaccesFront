import Ropita from "../../components/templates/Ropita";
import { useState, useEffect } from "react";
import { CreateDialog } from "./createDialog";
import { getUsersApi } from "../../services/api/auth";

const HistSalas = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const Odialog = () => {
    setOpen(true);
  };

  const Cdialog = () => {
    setOpen(false);
  };

  const MostrarUsers = async () => {
    const res = await getUsersApi();
    setUsers([...res.data]);
  };
  console.log(users);

  useEffect(() => {
    MostrarUsers();
  }, []);

  return (
    <>
      <Ropita>
        <button onClick={Odialog}>Open Dialog</button>
        <table>
          <thead>
            <tr>
              <th>Professor</th>
              <th>Subject</th>
              <th>Classroom</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Belen</td>
              <td>Math</td>
              <td>A</td>
              <td>2023-01-01</td>
              <td>10:00</td>
            </tr>
            <tr>
              <td>Belen</td>
              <td>Math</td>
              <td>A</td>
              <td>2023-01-01</td>
              <td>10:00</td>
            </tr>
          </tbody>
        </table>
        {/* aqui abajo se abre el crete dialog que es el contenido del dialog*/}
        <CreateDialog open={open} closeDialog={Cdialog} />
      </Ropita>
    </>
  );
};

export default HistSalas;
