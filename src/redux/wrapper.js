
export const commit = (type, payload) => ({ type, payload });

export const buildReducer = (initialState = {}, mutations, resetWhenLogout = true) => (state = initialState, action) => {
  return baseReducer(state, action, mutations, resetWhenLogout, initialState);
};

export const baseReducer = (state, action, mutations, resetWhenLogout = false, initialState = {}) => {
  const { type, payload } = action || {};
  let result = state;

  if (mutations[type]) {
    const newState = mutations[type](state, payload);
    if (newState) { return newState; }
  }
  return result;
};
