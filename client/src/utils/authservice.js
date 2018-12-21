import axios from "axios";
import decode from "jwt-decode";
import config from "../config";
class AuthService {
  url = `${config.BASE_URL}/api/auth/login`;
  login = (username, password) => {
    return axios
      .post(this.url, {
        username,
        password
      })
      .then(res => res.data)
      .then(res => {
        this.setToken(res.user.token);
        return Promise.resolve(res);
      })
      .catch(err => Promise.reject(err));
  };
  setToken(token) {
    axios.defaults.headers.common["Authorization"] = token;
    localStorage.setItem("jwttoken", token);
  }
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      console.log(decoded);
      console.log(Date.now());
      return decoded.exp < Date.now() / 1000 ? true : false;
    } catch (err) {
      return false;
    }
  }
  isAuthenticated() {
    const token = this.getToken();
    console.log(token);
    if (!token || this.isTokenExpired(token)) {
      return false;
    } else {
      return true;
    }
  }
  getToken() {
    return localStorage.getItem("jwttoken");
  }

  logout() {
    delete axios.defaults.headers.common["Authorization"];
    // Clear user token and profile data from localStorage
    localStorage.removeItem("jwttoken");
  }
}

export let authService = new AuthService();
