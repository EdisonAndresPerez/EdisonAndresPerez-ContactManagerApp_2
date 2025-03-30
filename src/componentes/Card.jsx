import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { toggleFavorite, removeContact, updatedContact } from "../redux/contactSlice";

export function Cards({ user }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resetear el formulario cuando cambia el modo de edición
  useEffect(() => {
    if (isEditing) {
      setFormData({ ...user });
    }
  }, [isEditing, user]);

  const handleFavorite = () => {
    dispatch(toggleFavorite(user.id));
  };

  const removeUser = () => {
    dispatch(removeContact(user.id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(updatedContact({
        id: user.id,
        userData: formData
      })).unwrap();
      setIsEditing(false);
    } catch (error) {
      alert(`Error al actualizar: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="card-container">
      {isEditing ? (
        <div className="edit-form">
          <div className="prueba">
            {[
              {label: "Nombre", name: "first_name", type:"text"},
              {label: "Apellido", name: "last_name", type:"text"},
              {label: "Email", name: "email", type:"email"},
              {label: "Edad", name: "edad", type:"number"},
              {label: "Ciudad", name: "ciudad", type:"text"},
              {label: "Pais", name: "pais", type:"text"},
              {label: "Trabajo", name: "trabajo", type:"text"},
              {label: "Telefono", name: "telefono", type:"text"},
            ].map((field) => (
              <div className="input-group" key={field.name}>
                <label>{field.label}:</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button 
              onClick={handleSave} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
            <button 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            width="100px"
            height="100px"
            className={user.isFavorite ? "card-img-favorite" : ""}
          />
          <div className="card-info">
            <h2>{user.first_name} {user.last_name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Edad:</strong> {user.edad}</p>
            <p><strong>Ciudad:</strong> {user.ciudad}</p>
            <p><strong>País:</strong> {user.pais}</p>
            <p><strong>Trabajo:</strong> {user.trabajo}</p>
            <p><strong>Teléfono:</strong> {user.telefono}</p>
          </div>
          <hr />
          {user.isFavorite ? (
            <button className="card-btnEliminar" onClick={handleFavorite}>
              <FontAwesomeIcon icon={faTimes} /> Quitar favorito
            </button>
          ) : (
            <div className="card-iconosContainer">
              <FontAwesomeIcon
                icon={faHeart}
                className="card-iconoCorazon"
                onClick={handleFavorite}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="card-iconoEliminar"
                onClick={removeUser}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className="card-iconoEditar"
                onClick={() => setIsEditing(true)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}