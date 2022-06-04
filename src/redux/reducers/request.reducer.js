import { SET_TOPICS, REQUEST_CLEAR_MESSAGE, REQUEST_SET_MESSAGE } from "../../constants/action-types";

const initialState = {
  topics: [],
  message: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TOPICS:
      return {
        topics: payload.data
      };
    case REQUEST_SET_MESSAGE:
      return {
        message: payload
      };
    case REQUEST_CLEAR_MESSAGE:
      return {
        message: ""
      };
    default:
      return state;
  }
}