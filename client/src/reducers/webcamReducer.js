import { SELECT_WEBCAM } from '../actions/types';

const initialState = null
export default function(state = initialState, action) {
  switch(action.type) {
    case SELECT_WEBCAM:
        return action.payload
    default:
      return state;
  }
}