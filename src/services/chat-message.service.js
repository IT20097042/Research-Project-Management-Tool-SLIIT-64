import axios from "axios";

import { API_BASE_URL } from "../constants/constant";
import { authorizationHeader } from "../helpers/common.helper";

class ChatMessageService {
  add(data) {
    return axios.post(API_BASE_URL + "/chat/add", data, { headers: authorizationHeader() });
  }

  getAllChatGroupsForSupervisor() {
    return axios.get(API_BASE_URL + "/chat/getAllChatGroupsForSupervisor", { headers: authorizationHeader() });
  }

  getAllMessagesUsingGroupId(id) {
    return axios.get(API_BASE_URL + "/chat/getAllMessagesUsingGroupId/" + id, { headers: authorizationHeader() });
  }
}

export default new ChatMessageService();