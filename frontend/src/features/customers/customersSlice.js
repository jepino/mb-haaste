import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../app/api';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null,
};

const handlePending = (state, action) => {
  const { requestId } = action.meta;
  if (state.status === 'idle') {
    state.status = 'pending';
    state.currentRequestId = requestId;
  }
};

const handleRejected = (state, action) => {
  const { requestId } = action.meta;
  if (state.status === 'pending' && state.currentRequestId === requestId) {
    state.status = 'idle';
    state.error = action.error;
    state.currentRequestId = null;
  }
};

const createFulfilledHandler = updateStateData => (state, action) => {
  const { requestId } = action.meta;
  if (state.status === 'pending' && state.currentRequestId === requestId) {
    state.status = 'idle';
    state.currentRequestId = null;
    updateStateData(state, action);
  }
};

const handleFulfilledOverwrite = createFulfilledHandler((state, action) => {
  state.data = action.payload;
});

const handleFulfilledConcat = createFulfilledHandler((state, action) => {
  state.data = state.data.concat(action.payload);
});

const handleFulfilledUpdate = createFulfilledHandler((state, action) => {
  state.data = state.data.map(customer =>
    customer.id === action.payload.id ? action.payload : customer
  );
});

// CUSTOMERS
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCustomers.pending, handlePending)
      .addCase(fetchCustomers.fulfilled, handleFulfilledOverwrite)
      .addCase(fetchCustomers.rejected, handleRejected)
      .addCase(fetchCustomerById.pending, handlePending)
      .addCase(fetchCustomerById.fulfilled, handleFulfilledConcat)
      .addCase(fetchCustomerById.rejected, handleRejected)
      .addCase(createCustomer.pending, handlePending)
      .addCase(createCustomer.fulfilled, handleFulfilledConcat)
      .addCase(createCustomer.rejected, handleRejected)
      .addCase(updateCustomer.pending, handlePending)
      .addCase(updateCustomer.fulfilled, handleFulfilledUpdate)
      .addCase(updateCustomer.rejected, handleRejected);
  },
});
export default customersSlice.reducer;

export const fetchCustomers = createAsyncThunk(
  'customers',
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
