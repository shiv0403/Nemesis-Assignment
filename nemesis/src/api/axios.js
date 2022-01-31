import axios from "axios";

export default axios.create({
  baseURL: "https://nemesisassignment.herokuapp.com/",
  withCredentials: true,
});
