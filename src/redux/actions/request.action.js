import { SET_TOPICS, REQUEST_SET_MESSAGE, REQUEST_CLEAR_MESSAGE } from "../../constants/action-types";
import RequestService from "../../services/request.service";

export const getTopicsForSupervisor = () => (dispatch) => {
  return RequestService.getAllTopicsForSupervisor().then(
    (response) => {
      if (response.data.success) {
        dispatch({
          type: SET_TOPICS,
          payload: response.data.data
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: REQUEST_SET_MESSAGE,
          payload: response.data.message
        });
        return Promise.reject();
      }
    },
    (error) => {
      const message = error.response.data.message;
      dispatch({
        type: REQUEST_SET_MESSAGE,
        payload: message
      });
      return Promise.reject();
    }
  );
};

export const clearRequestMessage = () => ({
  type: REQUEST_CLEAR_MESSAGE
});