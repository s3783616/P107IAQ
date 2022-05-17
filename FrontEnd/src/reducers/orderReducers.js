import {
  CANCEL_ORDER,
  GET_ORDERS,
  GET_SEARCHED_ORDERS,
} from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        orders3: action.payload,
      };
    case GET_SEARCHED_ORDERS:
      return {
        orders3: action.payload,
      };
    case CANCEL_ORDER:
      return {
        result: action.payload,
      };
    default:
      return state;
  }
}
