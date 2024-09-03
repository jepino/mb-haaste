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

const createFulfilledHandler = updateState => (state, action) => {
  const { requestId } = action.meta;
  if (state.status === 'pending' && state.currentRequestId === requestId) {
    state.status = 'idle';
    state.currentRequestId = null;
    updateState(state, action);
  }
};

export const handleAsyncThunk = (builder, asyncThunk, onFulfilled) => {
  builder
    .addCase(asyncThunk.pending, handlePending)
    .addCase(asyncThunk.rejected, handleRejected)
    .addCase(asyncThunk.fulfilled, createFulfilledHandler(onFulfilled));
};
