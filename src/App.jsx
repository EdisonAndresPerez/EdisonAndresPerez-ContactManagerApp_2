import "./App.css";
import { useState} from "react";
import { Nav } from "./componentes/Nav"; // Importación correcta de Nav
import { Form } from "./componentes/Form"; // Importación corregida de Form
import { Outlet } from "react-router-dom";

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <div>
      <Nav toggleForm={toggleForm} />
      {showForm && <Form toggleForm={toggleForm} />}
      <Outlet />
    </div>
  );
}
export default App;
