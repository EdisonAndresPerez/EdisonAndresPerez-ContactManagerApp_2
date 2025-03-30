// Form.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../redux/contactSlice";
import "../App.css";

/**
 * Componente `Form`
 *
 * Este componente es un formulario que permite al usuario ingresar información para crear un nuevo contacto.
 * El formulario tiene los campos básicos: nombre, apellido, correo electrónico y una opción para activar el estado "favorito".
 *
 * Al hacer submit, se previene el comportamiento predeterminado (recarga de la página) y se llama a la función `toggleForm`
 * que probablemente cierre el formulario o cambie su estado.
 */
export function Form({ toggleForm }) {
  const dispatch = useDispatch(); // Para enviar acciones a Redux
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",

    isFavorite: false,
    isDeleted: false,
    avatar: `https://reqres.in/img/faces/${
      Math.floor(Math.random() * 12) + 1
    }-image.jpg`, // Foto aleatoria
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Creamos un nuevo contacto con un ID único
    const newContact = { ...formData, id: Date.now() };

    // Enviamos el contacto a Redux
    dispatch(addContact(newContact));

    // Cerramos el formulario
    toggleForm();
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="container">
        <div className="input-group">
          <label htmlFor="firstName">Name the person:</label>
          <input
            type="text"
            id="firstName"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">LasName the person:</label>
          <input
            type="text"
            id="lastName"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">persons email address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="age">age of the person:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="ciudad">city of the person:</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="pais">country of the person:</label>
          <input
            type="text"
            id="pais"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="trabajo">work of the person:</label>
          <input
            type="text"
            id="trabajo"
            name="trabajo"
            value={formData.trabajo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="telefono">persons phone number:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group-form">
          <input className="input-icono" type="checkbox" id="likeFavorite" name="isFavorite" checked={formData.isFavorite} onChange={handleChange}/>
          <label htmlFor="likeFavorite">Activate person to favorite</label>
        </div>
        <div className="input-group">
          <input type="submit" value="Save Contact" />
        </div>
      </div>
    </form>
  );
}
