export const initialStateMetadata = {
  status: 'idle',
  error: null,
  currentRequestId: null,
};

export const handleMetaPending = (state, action) => {
  const { requestId } = action.meta;
  if (state.status === 'idle') {
    state.status = 'pending';
    state.currentRequestId = requestId;
  }
};

export const handleMetaRejected = (state, action) => {
  const { requestId } = action.meta;
  if (state.status === 'pending' && state.currentRequestId === requestId) {
    state.status = 'idle';
    state.error = action.error;
    state.currentRequestId = null;
  }
};

export const createMetaFulfilledHandler = updateState => (state, action) => {
  const { requestId } = action.meta;
  if (state.status === 'pending' && state.currentRequestId === requestId) {
    state.status = 'idle';
    state.currentRequestId = null;
    updateState(state, action);
  }
};
