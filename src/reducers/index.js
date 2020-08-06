import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import attendeeReducer from "./attendeeReducer";


const appReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    attendee: attendeeReducer,
    Intl
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }  
    return appReducer(state, action)
  }

export default rootReducer;