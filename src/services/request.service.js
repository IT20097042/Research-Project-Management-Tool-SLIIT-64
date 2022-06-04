import axios from "axios";

import { API_BASE_URL } from "../constants/constant";
import { authorizationHeader } from "../helpers/common.helper";

class RequestService {
  getAllTopicsForSupervisor() {
    return axios.get(API_BASE_URL + "/request/getAllTopicsForSupervisor", { headers: authorizationHeader() });
  }

  getAllTopicsForPanel() {
    return axios.get(API_BASE_URL + "/request/getAllTopicsForPanel", { headers: authorizationHeader() });
  }

  evaluateRequest(data) {
    return axios.post(API_BASE_URL + "/request/evaluateRequest", data, { headers: authorizationHeader() });
  }
}

export default new RequestService();