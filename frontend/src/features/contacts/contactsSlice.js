import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { client } from '../../app/api';
import {
  handleAsyncThunk,
  initialStateMetadata,
} from '../../app/asyncThunksHandler';

const contactsAdapter = createEntityAdapter({
  selectId: contact => contact.id,
});

const initialState = contactsAdapter.getInitialState(initialStateMetadata);

export const fetchContacts = createAsyncThunk(
  'contacts',
  async () => {
    const result = await client('/api/contacts');
    return result;
  },
  {
    condition: (_args, { getState }) => {
      const { contacts } = getState();
      return contacts.status !== 'pending';
    },
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    handleAsyncThunk(builder, fetchContacts, contactsAdapter.setAll);
  },
});
export default contactsSlice.reducer;

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
  selectEntities: selectContactEntities,
  selectIds: selectContactIds,
} = contactsAdapter.getSelectors(state => state.contacts);

const selectContactsStatus = state => state.contacts.status;
export const selectContactsLoading = createSelector(
  selectContactsStatus,
  status => status === 'pending'
);
export const selectContactsError = state => state.contacts.error;
