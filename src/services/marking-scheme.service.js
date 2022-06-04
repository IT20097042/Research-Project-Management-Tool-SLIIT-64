import axios from "axios";

import { API_BASE_URL } from "../constants/constant";
import { authorizationHeader } from "../helpers/common.helper";

class MarkingSchemeService {
  createMarkingScheme(data){
      return axios.post(API_BASE_URL + "/marking-scheme", data, { headers: authorizationHeader() });
  }
}

export default new MarkingSchemeService();