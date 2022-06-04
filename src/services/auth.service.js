import axios from "axios";

import { API_BASE_URL } from "../constants/constant";

class AuthService {
    signin(student_id, password) {
        return axios
            .post(API_BASE_URL + "/auth/signin", { student_id, password })
            .then((response) => {
                if (response.data.token) {
                    response.data.user.token = response.data.token;
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }
                return response.data;
            });
    }

    signup(data) {
        return axios.post(API_BASE_URL + "/auth/signup", data);
    }

    signout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();