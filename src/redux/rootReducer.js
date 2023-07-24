import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import sessionReducer from './session/sessionReducer';
import tasksReducer from './tasks/tasksReducer';
import sheetsReducer from './sheets/sheetsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  tasks: tasksReducer,
  sheets: sheetsReducer,
});

export default rootReducer;
