import { combineReducers } from 'redux';

import errorReducer from './errorReducer'
import authReducer from './authReducer'
import webcamReducer from './webcamReducer'

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  webcam : webcamReducer
});