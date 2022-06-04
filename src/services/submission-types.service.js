import axios from "axios";

import { API_BASE_URL } from "../constants/constant";
import { authorizationHeader } from "../helpers/common.helper";

class submissionTypesService {
  getAllSubmissionTypes() {
    return axios.get(API_BASE_URL + "/submission-types", { headers: authorizationHeader() });
  }

  addSubmissionTytpe(data){
      return axios.post(API_BASE_URL + "/submission-types", data, { headers: authorizationHeader() },  )
  }
}

export default new submissionTypesService();