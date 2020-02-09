import { all, takeLatest } from 'redux-saga/effects';

import { types } from 'reducers/application';

function clearSessionIdWorker() {
  localStorage.removeItem('sessionId');
}

function setSessionIdWorker({ sessionId }) {
  localStorage.setItem('sessionId', sessionId);
}

export const workers = {
  clearSessionIdWorker,
  setSessionIdWorker
};

function* clearSessionIdWatcher() {
  return yield takeLatest(types.CLEAR_SESSION_ID, clearSessionIdWorker);
}

function* setSessionIdWatcher() {
  return yield takeLatest(types.SET_SESSION_ID, setSessionIdWorker);
}

export const watchers = {
  clearSessionIdWatcher,
  setSessionIdWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
