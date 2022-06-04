import axios from "axios";

import { API_BASE_URL } from "../constants/constant";
import { authorizationHeader } from "../helpers/common.helper";

class SubmissionService {
  getAllSubmissionsForSupervisor() {
    return axios.get(API_BASE_URL + "/submission/getAllSubmissionsForSupervisor", { headers: authorizationHeader() });
  }

  getAllSubmissionsForPanel() {
    return axios.get(API_BASE_URL + "/submission/getAllSubmissionsForPanel", { headers: authorizationHeader() });
  }

  evaluateSubmission(data) {
    return axios.post(API_BASE_URL + "/submission/evaluateSubmission", data, { headers: authorizationHeader() });
  }
}

export default new SubmissionService();