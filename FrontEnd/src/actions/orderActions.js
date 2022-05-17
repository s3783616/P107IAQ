import axios from "axios";
import { GET_SEARCHED_ORDERS, GET_ORDERS, CANCEL_ORDER } from "./types";

export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8081/api/orders/`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (error) {}
};

export const getSearchedOrders =
  (searchTerm = "", searchType, statusOptions) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8081/api/orders/search`, {
        params: {
          searchTerm,
          searchType,
          statusOptions,
        },
      });
      dispatch({
        type: GET_SEARCHED_ORDERS,
        payload: res.data,
      });
    } catch (error) {}
  };
export const cancelOrder = (order) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:8081/api/orders/update/${order.id}`,
      {
        userId: order.userId,
        status: "CANCELLED",
        paid: false,
      }
    );
    dispatch({
      type: CANCEL_ORDER,
      payload: res.data,
    });
  } catch (error) {}
};
