import React from "react";
import { isEmail } from "validator";

export function authorizationHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        return { Authorization: "Bearer " + user.token };
    } else {
        return {};
    }
}

export const fieldRequired = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger mt-1" role="alert">
                This field is required
            </div>
        );
    }
};

export const emailValidate = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger mt-1" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

export const unifiedIdLengthValidate = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger mt-1" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

export const passwordLengthValidate = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger mt-1" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};