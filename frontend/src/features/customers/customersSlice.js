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
import { CustomerFilter } from './customerFilter';
import {
  selectAllContacts,
  selectContactById,
} from '../contacts/contactsSlice';

export const fetchCustomers = createAsyncThunk(
  'customers/fetchAll',
  async () => {
    const result = await client('/api/customers');
    return result;
  },
  {
    condition: (_args, { getState }) => {
      const status = selectCustomerStatus(getState());
      return status !== 'pending';
    },
  }
);

export const fetchCustomerById = createAsyncThunk(
  'customers/fetchById',
  async id => {
    const result = await client(`/api/customers/${id}`);
    return result;
  },
  {
    condition: (id, { getState }) => {
      const state = getState();
      const status = selectCustomerStatus(state);
      const customer = selectCustomerById(state, id);

      return status !== 'pending' && !customer;
    },
  }
);

export const createCustomer = createAsyncThunk(
  'customers/create',
  async data => {
    const result = await client(`/api/customers`, { data, method: 'POST' });
    return result;
  },
  {
    condition: ({ name, country, isActive }) => {
      const isActiveIsBool = isActive === true || isActive === false;
      return !!name && !!country && isActiveIsBool;
    },
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async data => {
    const result = await client(`/api/customers/${data.id}`, {
      data,
      method: 'PUT',
    });
    return { id: data.id, changes: result };
  },
  {
    condition: ({ id, name, country, isActive }) => {
      const isActiveIsBool = isActive === true || isActive === false;
      return !!id && !!name && !!country && isActiveIsBool;
    },
  }
);

export const fetchCustomerContacts = createAsyncThunk(
  'customers/fetchContacts',
  async id => {
    const result = await client(`/api/customers/${id}/contacts`);
    const mappedContactIds = result.map(
      customerContact => customerContact.contactId
    );
    return { id, changes: { contacts: mappedContactIds } };
  },
  {
    condition: (id, { getState }) => {
      const state = getState();
      const customer = selectCustomerById(state, id);
      const status = selectCustomerStatus(state);

      return (
        status !== 'pending' &&
        !!customer &&
        (customer.contacts ?? []).length === 0
      );
    },
  }
);

// MB-DONE: create action for creating customer contacts. NOTE: remember to add them to `customerSlice`
export const createCustomerContact = createAsyncThunk(
  'customers/createContact',
  async ({ customerId, contactId }) => {
    const result = await client(`/api/customers/${customerId}/contacts`, {
      data: { contactId },
      method: 'POST',
    });
    return result;
  },
  {
    condition: ({ customerId, contactId }, { getState }) => {
      const state = getState();
      const customer = selectCustomerById(state, customerId);
      const contact = selectContactById(state, contactId);
      const existingContacts = customer.contacts ?? [];

      return (
        !!contact && !!customer && !existingContacts.some(c => c === contactId)
      );
    },
  }
);

export const removeCustomerContact = createAsyncThunk(
  'customers/removeContact',
  async ({ customerId, contactId }) => {
    await client(`/api/customers/${customerId}/contacts/${contactId}`, {
      method: 'DELETE',
    });
    return { customerId, contactId };
  },
  {
    condition: ({ customerId, contactId }, { getState }) => {
      const customer = selectCustomerById(getState(), customerId);

      return !!customer && customer.contacts.some(c => c === contactId);
    },
  }
);

const customerAdapter = createEntityAdapter({
  selectId: customer => customer.id,
});

const initialState = customerAdapter.getInitialState(initialStateMetadata);

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCustomers.pending, handleMetaPending)
      .addCase(fetchCustomers.rejected, handleMetaRejected)
      .addCase(
        fetchCustomers.fulfilled,
        createMetaFulfilledHandler(customerAdapter.setAll)
      )
      .addCase(fetchCustomerById.fulfilled, customerAdapter.upsertOne)
      .addCase(createCustomer.fulfilled, customerAdapter.addOne)
      .addCase(updateCustomer.fulfilled, customerAdapter.upsertOne)
      .addCase(fetchCustomerContacts.fulfilled, customerAdapter.updateOne)
      .addCase(createCustomerContact.fulfilled, (state, action) => {
        const { customerId, contactId } = action.payload;
        const customer = state.entities[customerId];
        customer.contacts = [...(customer.contacts ?? []), contactId];
      })
      .addCase(removeCustomerContact.fulfilled, (state, action) => {
        const { customerId, contactId } = action.payload;
        const customer = state.entities[customerId];
        customer.contacts = customer.contacts.filter(c => c !== contactId);
      });
  },
});
export default customersSlice.reducer;

export const {
  selectIds: selectCustomerIds,
  selectAll: selectAllCustomers,
  selectEntities: selectCustomerEntities,
  selectById: selectCustomerById,
} = customerAdapter.getSelectors(state => state.customers);

const selectCustomerStatus = state => state.customers.status;
export const selectCustomerLoading = createSelector(
  selectCustomerStatus,
  status => status === 'pending'
);
export const selectCustomerError = state => state.customers.error;

export const selectFilteredCustomerIds = createSelector(
  [selectCustomerIds, selectCustomerEntities, (state, filter) => filter],
  (ids, entities, filter) => {
    return ids.filter(id => {
      switch (filter) {
        case CustomerFilter.ALL: {
          return true;
        }
        case CustomerFilter.ACTIVE: {
          return entities[id].isActive;
        }
        case CustomerFilter.INACTIVE: {
          return !entities[id].isActive;
        }
        default: {
          return true;
        }
      }
    });
  }
);

export const selectCustomerContacts = createSelector(
  selectCustomerById,
  customer => customer.contacts || []
);

export const selectUnmappedContacts = createSelector(
  [selectCustomerContacts, selectAllContacts],
  (existingContacts, contacts) => {
    return contacts.filter(c => {
      return !existingContacts.includes(c.id);
    });
  }
);
