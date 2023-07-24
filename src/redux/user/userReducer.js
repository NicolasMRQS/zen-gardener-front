import {
  USER_DATA_UPDATED,
  USER_LOGGED_OUT,
  USER_DATA_RECEIVED,
  REGISTER_FAILED,
  REMOVE_REGISTER_ERROR_MESSAGE,
} from './userActions';

const userInitialState = {
  id: null,
  pseudo: null,
  email: null,
  address: null,
  city: null,
  zip_code: null,
  phone: null,
  task_notification: null,
  week_notification: null,
  updatedAt: null,
  registerFailed: false,
  errorMessage: '',
};

function reducer(state = userInitialState, action = {}) {
  switch (action.type) {
    case USER_DATA_RECEIVED: {
      const { userData } = action;
      return {
        ...state,
        ...userData,
      };
    }

    case USER_LOGGED_OUT:
      return {
        ...state,
        ...userInitialState,
      };

    case USER_DATA_UPDATED: {
      const { updatedAt } = action;
      return {
        ...state,
        updatedAt,
      };
    }

    case REGISTER_FAILED:
      return {
        ...state,
        registerFailed: true,
        errorMessage: action.message,
      };

    case REMOVE_REGISTER_ERROR_MESSAGE:
      return {
        ...state,
        registerFailed: false,
        errorMessage: '',
      };

    default:
      return state;
  }
}

export default reducer;
