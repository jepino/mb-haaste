import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { client } from '../../app/api';
import {
  createMetaFulfilledHandler,
  handleMetaPending,
  handleMetaRejected,
  initialStateMetadata,
} from '../../app/defaultAsyncHandlers';

const contactsAdapter = createEntityAdapter({
  selectId: contact => contact.id,
});

const initialState = contactsAdapter.getInitialState(initialStateMetadata);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const result = await client('/api/contacts');
    return result;
  },
  {
    condition: (_args, { getState }) => {
      const status = selectContactsStatus(getState());
      return status !== 'pending';
    },
  }
);

export const fetchContactById = createAsyncThunk(
  'contacts/fetchById',
  async id => {
    const result = await client(`/api/contacts/${id}`);
    return result;
  },
  {
    condition: (id, { getState }) => {
      const contact = selectContactById(getState(), id);
      return !contact;
    },
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handleMetaPending)
      .addCase(
        fetchContacts.fulfilled,
        createMetaFulfilledHandler(contactsAdapter.setAll)
      )
      .addCase(fetchContacts.rejected, handleMetaRejected)
      .addCase(fetchContactById.fulfilled, contactsAdapter.upsertOne);
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
