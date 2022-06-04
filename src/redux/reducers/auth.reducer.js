import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGNOUT,
} from "../../constants/action-types";

const user = JSON.parse(localStorage.getItem("user"));
let initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
initialState.message = null;

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                message: payload.message
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                message: payload
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                message: payload.message
            };
        case SIGNIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                message: payload
            };
        case SIGNOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}