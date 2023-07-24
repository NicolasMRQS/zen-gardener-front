import Client from '../../services/http/client';

import {
  LOGIN,
  LOGOUT,
  actionUpdateSession,
  actionLoginFailed,
} from './sessionActions';
import { actionUserDataReceived, actionUserLoggedOut } from '../user/userActions';
import { actionClearSheetsState, actionFetchFavoriteSheets } from '../sheets/sheetsActions';

import Config from '../../config';
import sessionMockAdapter from '../../services/mockApi/session';
import { actionClearTasksState, actionFetchTasks } from '../tasks/tasksActions';

if (Config.API_MOCK_ENABLED) {
  sessionMockAdapter(Client.getInstance(), Config.API_URL_SESSION);
}

const sessionMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const { email, password } = action;
      Client.getInstance()
        .post(Config.API_URL_SESSION, {
          email,
          password,
        })
        .then((response) => {
          // Login request successful => save session and user data
          const { userData, jwtToken } = response.data;
          store.dispatch(actionUpdateSession());
          store.dispatch(actionUserDataReceived(userData));
          Client.setToken(jwtToken);
          store.dispatch(actionFetchFavoriteSheets());
          store.dispatch(actionFetchTasks());
        })
        .catch((error) => {
          // Login request failed => log and inform user
          console.error('Error while logging in', error);
          store.dispatch(actionLoginFailed());
          if (error.response.status === 401) {
            store.dispatch(actionLoginFailed());
          }
        });
      break;
    }

    case LOGOUT: {
      Client.getInstance()
        .delete(Config.API_URL_SESSION)
        .catch((error) => console.error('Logout failed', error))
        .finally(() => {
          // Clearing session anyway for security reasons
          store.dispatch(actionUserLoggedOut(null));
          Client.clearToken();
          store.dispatch(actionClearTasksState());
          store.dispatch(actionClearSheetsState());
        });
      break;
    }

    default:
      break;
  }

  return next(action);
};

export default sessionMiddleware;
