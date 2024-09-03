import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../app/api';
import { handleAsyncThunk } from '../../app/asyncThunksHandler';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null,
};

// CUSTOMERS
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    handleAsyncThunk(builder, fetchCustomers, (state, action) => {
      state.data = action.payload;
    });
    handleAsyncThunk(builder, fetchCustomerById, (state, action) => {
      state.data = state.data.concat(action.payload);
    });
    handleAsyncThunk(builder, createCustomer, (state, action) => {
      state.data = state.data.concat(action.payload);
    });
    handleAsyncThunk(builder, updateCustomer, (state, action) => {
      state.data = state.data.map(customer =>
        customer.id === action.payload.id ? action.payload : customer
      );
    });
  },
});
export default customersSlice.reducer;

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
