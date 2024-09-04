import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { client } from '../../app/api';
import { handleAsyncThunk } from '../../app/asyncThunksHandler';
import { FilterState } from './CustomerTable';

export const fetchCustomers = createAsyncThunk(
  'customers/fetchAll',
  async () => {
    const result = await client('/api/customers');
    return result;
  },
  {
    condition: (_args, { getState }) => {
      const { customers } = getState();
      return customers.status !== 'pending';
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
      const { customers } = getState();
      return (
        customers.status !== 'pending' &&
        !customers.data.some(customer => customer.id === id)
      );
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
    return result;
  },
  {
    condition: ({ id, name, country, isActive }) => {
      const isActiveIsBool = isActive === true || isActive === false;
      return id && name && country && isActiveIsBool;
    },
  }
);

// MB-TODO: create action for creating customer contacts. NOTE: remember to add them to `customerSlice`

const customerAdapter = createEntityAdapter({
  selectId: customer => customer.id,
});

const initialState = customerAdapter.getInitialState({
  status: 'idle',
  error: null,
  currentRequestId: null,
});

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    handleAsyncThunk(builder, fetchCustomers, customerAdapter.setAll);
    handleAsyncThunk(builder, fetchCustomerById, customerAdapter.setOne);
    handleAsyncThunk(builder, createCustomer, customerAdapter.setOne);
    handleAsyncThunk(builder, updateCustomer, customerAdapter.updateOne);
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
        case FilterState.ALL: {
          return true;
        }
        case FilterState.ACTIVE: {
          return entities[id].isActive;
        }
        case FilterState.INACTIVE: {
          return !entities[id].isActive;
        }
        default: {
          return true;
        }
      }
    });
  }
);
