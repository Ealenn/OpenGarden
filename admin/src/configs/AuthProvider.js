import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import jwt_decode from "jwt-decode";

export const AuthProvider = {
  login: (params) => new Promise((resolve, reject) => {
    axios.post(BASE_URL + '/account/login', {
      email: params.username,
      password: params.password
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(request => {
        localStorage.setItem('auth', JSON.stringify(request.data.access_token));
        return resolve();
      })
      .catch(exception => {
        return reject(exception);
      })
  }),
  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },
  checkAuth: () => new Promise((resolve, reject) => {
    const ticket = jwt_decode(localStorage.getItem('auth'));
    const expiration = Math.floor((Date.now() / 1000) - (1000 * 60 * 5));

    if (ticket.exp < expiration) {
      return reject();
    }
    return resolve();
  }),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    const user = jwt_decode(localStorage.getItem('auth'));
    user.fullName = user.username;
    return user;
  },
  getPermissions: () => Promise.resolve(''),
}
