import axios from "axios";

import { API_BASE_URL } from "../constants/constant";
import { authorizationHeader } from "../helpers/common.helper";

class AllocatePanelmemberService {
  allocatePanelmember(data){
      return axios.post(API_BASE_URL + "/allocate-panel-member", data, { headers: authorizationHeader() });
  }
}

export default new AllocatePanelmemberService();