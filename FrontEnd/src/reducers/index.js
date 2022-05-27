import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import dataReducers from "./dataReducers";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  datas: dataReducers,
});
