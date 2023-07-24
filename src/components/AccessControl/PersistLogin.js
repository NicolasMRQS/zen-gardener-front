import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Client from '../../services/http/client';
import Config from '../../config';
import { actionUserDataReceived } from '../../redux/user/userActions';
import { actionUpdateSession } from '../../redux/session/sessionActions';
import { actionFetchFavoriteSheets } from '../../redux/sheets/sheetsActions';

import Loading from '../Loading';

import './style.scss';
import { actionFetchTasks } from '../../redux/tasks/tasksActions';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    Client.getInstance()
      // Send token to the server
      .get(Config.API_URL_MEMBER)

      // Token is valid
      .then((response) => {
        const userData = response.data;
        dispatch(actionUserDataReceived(userData));
        dispatch(actionUpdateSession());
        dispatch(actionFetchFavoriteSheets());
        dispatch(actionFetchTasks());
      })
      // No token / Token is not valid
      .catch((error) => console.error('No token', error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <Outlet />}
    </>
  );
}

export default PersistLogin;
