import { configureStore } from '@reduxjs/toolkit';
import customersReducer from '../features/customers/customersSlice';
import contactsReducer from '../features/contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    customers: customersReducer,
    contacts: contactsReducer,
  },
});
