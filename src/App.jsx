import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HistSalas from "./pages/HistSalas";

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={< />} />*/}
        <Route path="/" element={<HistSalas />} />
      </Routes>
    </Router>
  );
}

export default App;
