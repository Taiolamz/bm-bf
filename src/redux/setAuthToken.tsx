import axios from "../utils/axios";
import CryptoJS from "crypto-js";

const setAuthToken = () => {
  const token = localStorage.getItem("token");
  const decryptTokenFunc = (tok: any) => {
    const encryptedToken = tok;
    const secretKey =
      "ygb0728hnw7eyhidh7t762y2bdxr6abxjbaxr6wuetyehjwu73ehuyst7gduu";

    // Encrypt the token
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(tok);
    // console.log(decryptedToken, "old-------------token");
    return decryptedToken;
  };
  if (token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${decryptTokenFunc(token)}`,
    };
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;