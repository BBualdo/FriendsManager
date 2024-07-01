import { url } from "@/config/config";
import { Friend } from "@/models/Friend";
import axios from "axios";

class FriendsService {
  async GetFriends(): Promise<Friend[]> {
    return (await axios.get(url + "/friends")).data as Friend[];
  }
}

export default new FriendsService();
