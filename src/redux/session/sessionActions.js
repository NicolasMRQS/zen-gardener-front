// ACTION TYPES

// Handled by middleware
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Handled by reducer
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const REMOVE_LOGIN_ERROR_MESSAGE = 'REMOVE_LOGIN_ERROR_MESSAGE';

// ACTION CREATORS

/** Action dispatched when user submits login form */
export const actionLogin = (email, password) => ({
  type: LOGIN,
  email,
  password,
});

/** Action dispatched when user logs out */
export const actionLogout = () => ({
  type: LOGOUT,
});

/** Action dispatched when user login request is failure */
export const actionLoginFailed = () => ({
  type: LOGIN_FAILED,
});

export const actionRemoveLoginErrorMessage = () => ({
  type: REMOVE_LOGIN_ERROR_MESSAGE,
});

/** Action dispatched when :
 * 1. API login request is successful
 * OR
 * 2. when user logs out (provide no argument) */
export const actionUpdateSession = (jwtToken = null) => ({
  type: UPDATE_SESSION,
  jwtToken,
});
