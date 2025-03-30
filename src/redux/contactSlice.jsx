import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, createUser, updateUser } from '../api';

// Acción asincrónica para cargar usuarios
export const loadUsers = createAsyncThunk(
  'contacts/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción asincrónica para añadir usuario
export const addNewUser = createAsyncThunk(
  'contacts/addNewUser',
  async (userData, { rejectWithValue }) => {
    try {
      return await createUser(userData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción asincrónica para actualizar usuario (CORRECCIÓN: rejectWithValue estaba mal escrito)
export const updatedContact = createAsyncThunk(
  'contacts/updateContact',
  async ({id, userData}, { rejectWithValue }) => {
    try {
      return await updateUser(id, userData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    loading: false,
    error: null
  },
  reducers: {
    // Reducers síncronos
    removeContact: (state, action) => {
      const id = action.payload;
      const contact = state.contacts.find((contact) => contact.id === id);
      if (contact) {
        contact.isDeleted = !contact.isDeleted;
      }
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const contact = state.contacts.find((contact) => contact.id === id);
      if (contact) {
        contact.isFavorite = !contact.isFavorite;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(state.contacts.map(c => c.id));
        const newContacts = action.payload.filter(user => !existingIds.has(user.id));
        state.contacts = [...state.contacts, ...newContacts];
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(updatedContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatedContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.contacts[index] = action.payload;
      })
      .addCase(updatedContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Exportar acciones (CORRECCIÓN: editContact y addContact no existen en tus reducers)
export const { 
  removeContact, 
  toggleFavorite 
} = contactSlice.actions;

export default contactSlice.reducer;