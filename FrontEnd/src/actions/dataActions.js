import axios from "axios";
import { GET_SEARCHED_DATA, GET_AVG_DATA, GET_1MIN_AVG_DATA } from "./types";

// Make a request to get get AirData for the specified Device in raw format.
//Maximum time range of AirData points returned: 1 hour(~360 data points of 10 second intervals).
export const getSearchedData =
  (deviceID = "") =>
  async (dispatch) => {
    try {
      let dateNow = new Date();
      let dateNext = new Date(dateNow.getTime() + 1 * 60000);
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

// Make a request to get the Device's AirData of 5-min-avg or 15-min-avg blocks.
export const getAvgData =
  (deviceID = "", dateFrom = "", dateTo = "", dataType = "") =>
  async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8081/api/data/getData`, {
        params: {
          deviceID,
          dateFrom,
          dateTo,
          dataType,
        },
      });

      dispatch({
        type: GET_AVG_DATA,
        payload: res.data,
      });
    } catch (error) {}
  };

// Make a request to get the Device's AirData of 1-min-abg block. (Client request)
export const get1MinAvgData =
  (deviceID = "", dateFrom = "", dateTo = "") =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:8081/api/data/1minInterval`,
        {
          params: {
            deviceID,
            dateFrom,
            dateTo,
          },
        }
      );

      dispatch({
        type: GET_1MIN_AVG_DATA,
        payload: res.data,
      });
    } catch (error) {}
  };
