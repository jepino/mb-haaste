import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from './api'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null
}

// CONTACTS
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = action.payload
          state.currentRequestId = null
        }
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
  }
})
export const contactReducer = contactsSlice.reducer

export const fetchContacts = createAsyncThunk(
  'contacts',
  async () => {
    const result = await client('/api/contacts')
    return result
  },
  {
    condition: (_args, { getState }) => {
      const { contacts } = getState()
      return contacts.status !== 'pending'
    }
  }
)
