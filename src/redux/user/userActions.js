// ACTION TYPES

// Handled by middleware
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const REGISTER = 'REGISTER';

// Handled by reducer
export const USER_DATA_RECEIVED = 'USER_DATA_RECEIVED';
export const USER_DATA_UPDATED = 'USER_DATA_UPDATED';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const REGISTER_FAILED = 'REGISTER_FAILED';

// ACTION CREATORS

/** Action dispatched when user submits profile data update */
export const actionUpdateUserData = (userData) => ({
  type: UPDATE_USER_DATA,
  userData,
});

/** Action dispatched when user data successfully fetched from API */
export const actionUserDataReceived = (userData) => ({
  type: USER_DATA_RECEIVED,
  userData,
});

/** Action dispatched when user data successfully updated by API */
export const actionUserDataUpdated = (updatedAt) => ({
  type: USER_DATA_UPDATED,
  updatedAt,
});

/** Action dispatched when user logged out => we need to clear any use info from app */
export const actionUserLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

/** Action dispatched when user register */
export const actionRegister = (inputs) => ({
  type: REGISTER,
  ...inputs,
});

export const actionRegisterFailed = (message) => ({
  type: REGISTER_FAILED,
  message,
});

export const REMOVE_REGISTER_ERROR_MESSAGE = 'REMOVE_REGISTER_ERROR_MESSAGE';

export const actionRemoveRegisterErrorMessage = () => ({
  type: REMOVE_REGISTER_ERROR_MESSAGE,
});
