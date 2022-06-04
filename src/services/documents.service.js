import axios from "axios";

import { API_BASE_URL } from "../constants/constant";
import { authorizationHeader } from "../helpers/common.helper";

class DocumentService {
  getAllDocuments() {
    return axios.get(API_BASE_URL + "/documents", { headers: authorizationHeader() });
  }

  addDocument(data){
      return axios.post(API_BASE_URL + "/documents", data, { headers: authorizationHeader() });
  }
}

export default new DocumentService();