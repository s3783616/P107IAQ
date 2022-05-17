import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import orderReducers from "./orderReducers";
import dataReducers from "./dataReducers";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  orders2: orderReducers,
  datas: dataReducers,
});
