/* eslint-disable camelcase */
import Client from '../../services/http/client';

import {
  FETCH_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  actionTaskDataReceived,
  actionTaskCreated,
  actionTaskUpdated,
  actionTaskDeleted,
  actionTaskCreateFailed,
  actionTaskUpdateFailed,
  actionTaskDeleteFailed,
} from './tasksActions';
import Config from '../../config';

import tasksMockAdapter from '../../services/mockApi/tasks';

if (Config.API_MOCK_ENABLED) {
  tasksMockAdapter(Client.instance, Config.API_URL_TASKS);
}

const tasksMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TASKS: {
      Client.instance
        .get(Config.API_URL_TASKS)
        .then((response) => {
          const taskList = response.data;
          store.dispatch(actionTaskDataReceived(taskList));
        })
        .catch((error) => {
          console.error('Error while updating task', error);
          store.dispatch(actionTaskUpdateFailed());
        });
      break;
    }

    case CREATE_TASK: {
      const { task } = action;
      Client.instance
        .post(Config.API_URL_TASKS, task)
        .then((response) => {
          const newTask = response.data[0];
          store.dispatch(actionTaskCreated(newTask));
        })
        .catch((error) => {
          console.error('Error while creating task', error);
          store.dispatch(actionTaskCreateFailed());
        });
      break;
    }

    case UPDATE_TASK: {
      const { task } = action;
      const taskId = task.id;
      delete task.id;
      Client.instance
        .put(`${Config.API_URL_TASKS}/${taskId}`, task)
        .then((response) => {
          const updatedTask = response.data[0];
          store.dispatch(actionTaskUpdated(updatedTask));
        })
        .catch((error) => {
          console.error('Error while updating task', error);
          store.dispatch(actionTaskUpdateFailed());
        });
      break;
    }

    case DELETE_TASK: {
      const { taskId } = action;
      Client.instance
        .delete(`${Config.API_URL_TASKS}/${taskId}`)
        .then(() => {
          store.dispatch(actionTaskDeleted(taskId));
        })
        .catch((error) => {
          console.error('Error while deleting task', error);
          store.dispatch(actionTaskDeleteFailed());
        });
      break;
    }

    default:
      break;
  }

  return next(action);
};

export default tasksMiddleware;
