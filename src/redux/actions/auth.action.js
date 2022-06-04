import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
  AUTH_CLEAR_MESSAGE
} from "../../constants/action-types";
import AuthService from "../../services/auth.service";

export const signup = (data) => (dispatch) => {
  return AuthService.signup(data).then(
    (response) => {
      if (response.data.success) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: response.data
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: SIGNUP_FAIL,
          payload: response.data.message
        });
        return Promise.reject();
      }
    },
    (error) => {
      const message = error.response.data.message;
      dispatch({
        type: SIGNUP_FAIL,
        payload: message
      });
      return Promise.reject();
    }
  );
};

export const signin = (student_id, password) => (dispatch) => {
  return AuthService.signin(student_id, password).then(
    (data) => {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: { user: data.user, message: data.message },
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data.message;
      dispatch({
        type: SIGNIN_FAIL,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const signout = () => (dispatch) => {
  AuthService.signout();
  dispatch({
    type: SIGNOUT
  });
};

export const clearAuthMessage = () => ({
  type: AUTH_CLEAR_MESSAGE
});