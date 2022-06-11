import {
  GET_AVG_DATA,
  GET_SEARCHED_DATA,
  GET_1MIN_AVG_DATA,
} from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    // if action type field is to get Airdata in raw format
    case GET_SEARCHED_DATA:
      return {
        data: action.payload,
      };
    // if action type field is to get Airdata in 5 or 15 min average format
    case GET_AVG_DATA:
      return {
        graphdata: action.payload,
      };
    // if action type field is to get Airdata in 1 min average format
    case GET_1MIN_AVG_DATA:
      return {
        graphdata: action.payload,
      };
    default:
      return state;
  }
}
