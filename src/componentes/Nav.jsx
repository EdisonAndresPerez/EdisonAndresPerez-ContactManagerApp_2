// Nav.js
import { NavLink } from "react-router-dom";
import "../App.css";

/**
 * Componente de Navegación (Nav)
 * 
 * - Contiene los enlaces principales de la aplicación.
 * - Muestra el logo en la parte izquierda.
 * - Tiene un botón `+ NEW` que abre un formulario para agregar contactos.
 */
export function Nav({ toggleForm }) {
  return (
    <nav>
      {/* Menú de navegación */}
      <ul className="nav-botonesNavbar">
        <li>
          <NavLink to={""} className="nav-btnOverview" aria-label="Ir a la vista general">
            OverView
          </NavLink>
        </li>
        <li>
          <NavLink to={"Contacts"} className="nav-btnContacts" aria-label="Ir a la lista de contactos">
            Contacts
          </NavLink>
        </li>
        <li>
          <NavLink to={"Favorites"} className="nav-btnFavorite" aria-label="Ir a la lista de favoritos">
            Favorites
          </NavLink>
        </li>
        <li>
          {/* Botón para abrir el formulario de nuevo contacto */}
          <button
            className="nav-btnNew"
            onClick={toggleForm} // Se pasa directamente la función
            aria-label="Abrir formulario para nuevo contacto"
          >
            Add person
          </button>
        </li>
      </ul>
    </nav>
  );
}