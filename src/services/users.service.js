import axios from "axios";

import { API_BASE_URL } from "../constants/constant";
import { authorizationHeader } from "../helpers/common.helper";

class usersService {
  getAllusers() {
    return axios.get(API_BASE_URL + "/users", { headers: authorizationHeader() });
  }
  getAllPanelMembers() {
    return axios.get(API_BASE_URL + "/users/panel-members", { headers: authorizationHeader() });
  }

  editUser(data) {
    return axios.put(API_BASE_URL + "/users", data, { headers: authorizationHeader() });
  }

  deleteUser(id) {
    return axios.delete(API_BASE_URL + "/users/"+id, { headers: authorizationHeader() });
  }
}

export default new usersService();