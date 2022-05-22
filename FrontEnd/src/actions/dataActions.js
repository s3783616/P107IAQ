import axios from "axios";
import {
  GET_SEARCHED_DATA,
  GET_15MIN_AVG_DATA,
  GET_1MIN_AVG_DATA,
} from "./types";

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

      dispatch({
        type: GET_SEARCHED_DATA,
        payload: res.data,
      });
    } catch (error) {}
  };

export const get15MinAvgData =
  (deviceID = "", dataType = "") =>
  async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8081/api/data/getData`, {
        params: {
          deviceID,
          dateFrom:
            new Date(new Date().getTime() - 720 * 60000)
              .toISOString()
              .substr(0, new Date().toISOString().length - 7) + "00",
          dateTo:
            new Date()
              .toISOString()
              .substr(0, new Date().toISOString().length - 7) + "00",
          dataType,
        },
      });

      dispatch({
        type: GET_15MIN_AVG_DATA,
        payload: res.data,
      });
    } catch (error) {}
  };

export const get1MinAvgData =
  (deviceID = "") =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:8081/api/data/1minInterval`,
        {
          params: {
            deviceID,
            dateFrom:
              new Date(new Date().getTime() - 720 * 60000)
                .toISOString()
                .substr(0, new Date().toISOString().length - 7) + "00",
            dateTo:
              new Date()
                .toISOString()
                .substr(0, new Date().toISOString().length - 7) + "00",
          },
        }
      );

      dispatch({
        type: GET_1MIN_AVG_DATA,
        payload: res.data,
      });
    } catch (error) {}
  };
