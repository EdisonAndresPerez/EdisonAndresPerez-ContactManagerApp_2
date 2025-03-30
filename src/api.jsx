const API_URL = 'https://api.escuelajs.co/api/v1';

// Función de transformación (corregí el nombre que tenía typo)
const transformUserToContact = (apiUser) => ({
  id: apiUser.id,
  avatar: apiUser.avatar || 'https://via.placeholder.com/150',
  first_name: apiUser.name?.split(' ')[0] || 'Nombre',
  last_name: apiUser.name?.split(' ')[1] || 'Apellido',
  email: apiUser.email || 'sin-email@example.com',
  isFavorite: false,
  isDeleted: false,
  edad: Math.floor(Math.random() * 30) + 20,
  ciudad: apiUser.address?.city || 'Ciudad desconocida',
  pais: 'País desconocido',
  trabajo: apiUser.role || 'Profesión desconocida',
  telefono: `+${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`
});

// Opción mejorada con timeout y headers
const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(timeoutId);
  return response;
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const fetchUsers = async () => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/users`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const users = await response.json();
    return users.map(transformUserToContact);
    
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(`No se pudieron cargar los usuarios: ${error.message}`);
  }
};

export const createUser = async (contactData) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: `${contactData.first_name} ${contactData.last_name}`.trim(),
        email: contactData.email,
        password: 'defaultPassword', // La API parece requerirlo
        avatar: contactData.avatar,
        role: contactData.trabajo,
        address: {
          city: contactData.ciudad,
          country: contactData.pais // Añadí país que estaba en tu modelo
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear usuario');
    }

    return transformUserToContact(await response.json());
    
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(`No se pudo crear el usuario: ${error.message}`);
  }
};
export const updateUser = async (id, contactData) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify({
        name: `${contactData.first_name} ${contactData.last_name}`.trim(),
        email: contactData.email,
        avatar: contactData.avatar,
        role: contactData.trabajo,
        address: {
          city: contactData.ciudad,
          country: contactData.pais
        }
      }),
    });
    if (!response.ok) throw new Error('Error al actualizar usuario');
    return transformUserToContact(await response.json());
  } catch (error) {
    throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
  }
};
