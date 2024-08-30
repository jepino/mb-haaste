import { configureStore } from '@reduxjs/toolkit'
import { customerReducer } from './customerSlices'
import { contactReducer } from './contactSlices'

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    contacts: contactReducer
  },
})