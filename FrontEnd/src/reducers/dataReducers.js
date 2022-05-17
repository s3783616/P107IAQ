import { GET_SEARCHED_DATA } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case GET_SEARCHED_DATA:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
}
