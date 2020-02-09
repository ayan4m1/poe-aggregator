import { buildActions } from 'utils';

export const types = buildActions('application', [
  'INIT_APP',
  'CLEAR_SESSION_ID',
  'SET_SESSION_ID'
]);

const initApp = () => ({
  type: types.INIT_APP
});

const clearSessionId = () => ({
  type: types.CLEAR_SESSION_ID
});

const setSessionId = sessionId => ({
  type: types.SET_SESSION_ID,
  sessionId
});

export const actions = {
  initApp,
  clearSessionId,
  setSessionId
};

export const initialState = {
  sessionId: null
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CLEAR_SESSION_ID:
      return {
        ...state,
        sessionId: null
      };
    case types.SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.sessionId
      };
    default:
      return state;
  }
};
