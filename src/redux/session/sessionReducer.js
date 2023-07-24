import {
  LOGIN_FAILED, LOGOUT, REMOVE_LOGIN_ERROR_MESSAGE, UPDATE_SESSION,
} from './sessionActions';

const sessionInitialState = {
  userIsLoggedIn: false,
  lastLoginFailed: false,
};

function reducer(state = sessionInitialState, action = {}) {
  switch (action.type) {
    case LOGIN_FAILED:
      return {
        ...state,
        userIsLoggedIn: false,
        lastLoginFailed: true,
      };

    case REMOVE_LOGIN_ERROR_MESSAGE:
      return {
        ...state,
        lastLoginFailed: false,
      };

    case UPDATE_SESSION: {
      return {
        ...state,
        userIsLoggedIn: true,
        lastLoginFailed: false,
      };
    }
    case LOGOUT: {
      return {
        userIsLoggedIn: false,
        lastLoginFailed: false,
      };
    }
    default:
      return state;
  }
}

export default reducer;
