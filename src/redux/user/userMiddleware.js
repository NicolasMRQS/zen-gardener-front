/* eslint-disable camelcase */
import Client from '../../services/http/client';

import {
  UPDATE_USER_DATA,
  actionUserDataUpdated,
  REGISTER,
  actionUserDataReceived,
  actionRegisterFailed,
} from './userActions';
import Config from '../../config';
import { actionLogin, actionUpdateSession } from '../session/sessionActions';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case UPDATE_USER_DATA: {
      const { userData } = action;
      Client.instance
        .patch(Config.API_URL_MEMBER, {
          ...userData,
        })
        .then((response) => {
          // User data updated successfully
          const { updatedAt } = response.data;
          store.dispatch(actionUserDataUpdated(updatedAt));
          store.dispatch(actionUserDataReceived(response.data));
        })
        .catch((error) => {
          // Login request failed => log and inform user
          console.error('Error while updating user data', error);
        });
      break;
    }
    case REGISTER: {
      const {
        email,
        pseudo,
        password,
        address,
        city,
        zip_code,
        phone,
      } = action;
      Client.instance
        .post(Config.API_URL_MEMBER, {
          pseudo,
          email,
          password,
          address,
          zip_code,
          city,
          phone,
          task_notification: true,
          week_notification: true,
        })
        .then((response) => {
          store.dispatch(actionUserDataReceived(response.data));
          store.dispatch(actionLogin(email, password));
          store.dispatch(actionUpdateSession());
        })
        .catch((error) => {
          console.error('Error while register', error);
          store.dispatch(actionRegisterFailed(error.response.data));
        });
      break;
    }

    default:
      break;
  }

  return next(action);
};

export default userMiddleware;
