import { GET_15MIN_AVG_DATA, GET_SEARCHED_DATA } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case GET_SEARCHED_DATA:
      return {
        data: action.payload,
      };
    case GET_15MIN_AVG_DATA:
      return {
        data2: action.payload,
      };
    default:
      return state;
  }
}
