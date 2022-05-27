import {
  GET_AVG_DATA,
  GET_SEARCHED_DATA,
  GET_1MIN_AVG_DATA,
} from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case GET_SEARCHED_DATA:
      return {
        data: action.payload,
      };
    case GET_AVG_DATA:
      return {
        graphdata: action.payload,
      };
    case GET_1MIN_AVG_DATA:
      return {
        graphdata: action.payload,
      };
    default:
      return state;
  }
}
