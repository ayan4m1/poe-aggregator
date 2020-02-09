import { createSelector } from 'reselect';

export const getApplication = state => state.application;

export const getSessionId = createSelector(
  getApplication,
  application => application.sessionId
);
