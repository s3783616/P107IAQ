import axios from "axios";
import { GET_SEARCHED_DATA } from "./types";

export const getSearchedData =
  (deviceID = "") =>
  async (dispatch) => {
    try {
      let dateNow = new Date();
      let dateNext = new Date(dateNow.getTime() + 10 * 60000);
      const res = await axios.get(`http://localhost:8081/api/data/getData`, {
        params: {
          deviceID,
          dateFrom:
            dateNow.toISOString().substr(0, dateNow.toISOString().length - 7) +
            "00",
          dateTo:
            dateNext
              .toISOString()
              .substr(0, dateNext.toISOString().length - 7) + "00",
          dataType: "raw",
        },
      });
      console.log(new Date().toISOString());
      console.log(new Date(new Date().getTime() + 10 * 60000).toISOString());
      dispatch({
        type: GET_SEARCHED_DATA,
        payload: res.data,
      });
    } catch (error) {}
  };
