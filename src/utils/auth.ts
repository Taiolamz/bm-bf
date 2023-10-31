import axios from "./axios";
// import banboxAPI from './banbox_axios';
const setAuthToken = () => {
  const token = localStorage.getItem("token");
  // logger.log(token, 'the token');
  if (token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token.toString()}`,
      redirect: "follow",
    };
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
