import axios from 'axios';
import authHeader from './auth-header';

<<<<<<< HEAD
const API_URL = 'https://zeibrary.herokuapp.com/api/test/';
=======
const API_URL = 'http://localhost:8080/api/test/';
>>>>>>> 8602a1f9c62d82b5840fe4bd6fe631522c987872

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
