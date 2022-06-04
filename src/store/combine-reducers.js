import { combineReducers } from "redux";

import AuthReducer from "../redux/reducers/auth.reducer";
import RequestReducer from "../redux/reducers/request.reducer";

export default combineReducers({
  auth: AuthReducer,
  request: RequestReducer,
});