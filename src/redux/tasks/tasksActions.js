// ACTION TYPES

// Handled by middleware
export const FETCH_TASKS = 'FETCH_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

// Handled by reducer
export const TASKS_RECEIVED = 'TASKS_RECEIVED';
export const TASK_CREATED = 'TASK_CREATED';
export const TASK_UPDATED = 'TASK_UPDATED';
export const TASK_DELETED = 'TASK_DELETED';
export const TASK_CREATE_FAILED = 'TASK_CREATE_FAILED';
export const TASK_UPDATE_FAILED = 'TASK_UPDATE_FAILED';
export const TASK_DELETE_FAILED = 'TASK_DELETE_FAILED';
export const TASK_IMPORTED = 'TASK_IMPORTED';
export const DELETE_IMPORTED_TASK_MESSAGE = 'DELETE_IMPORTED_TASK_MESSAGE';
export const CLEAR_TASKS_STATE = 'CLEAR_TASKS_STATE';

// ACTION CREATORS

/** Action dispatched when user submits new task to API */
export const actionFetchTasks = () => ({
  type: FETCH_TASKS,
});

/** Action dispatched when user submits new task to API */
export const actionCreateTask = (task) => ({
  type: CREATE_TASK,
  task,
});

/** Action dispatched when user submits new task to API */
export const actionUpdateTask = (task) => ({
  type: UPDATE_TASK,
  task,
});

/** Action dispatched when user submits new task to API */
export const actionDeleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId,
});

/** Action dispatched when tasks successfully fetched from API */
export const actionTaskDataReceived = (taskData) => ({
  type: TASKS_RECEIVED,
  taskData,
});

/** Action dispatched when user data successfully created by API */
export const actionTaskCreated = (task) => ({
  type: TASK_CREATED,
  task,
});

/** Action dispatched when user data successfully updated by API */
export const actionTaskUpdated = (task) => ({
  type: TASK_UPDATED,
  task,
});

/** Action dispatched when user data successfully deleted by API */
export const actionTaskDeleted = (taskId) => ({
  type: TASK_DELETED,
  taskId,
});

export const actionTaskCreateFailed = (failed = true) => ({
  type: TASK_CREATE_FAILED,
  failed,
});

export const actionTaskUpdateFailed = (failed = true) => ({
  type: TASK_UPDATE_FAILED,
  failed,
});

export const actionTaskDeleteFailed = (failed = true) => ({
  type: TASK_DELETE_FAILED,
  failed,
});

export const actionTaskImported = () => ({
  type: TASK_IMPORTED,
});

export const actionDeleteImportedTaskMessage = () => ({
  type: DELETE_IMPORTED_TASK_MESSAGE,
});

export const actionClearTasksState = () => ({
  type: CLEAR_TASKS_STATE,
});
