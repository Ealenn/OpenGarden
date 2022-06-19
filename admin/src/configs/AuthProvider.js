import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import jwt_decode from "jwt-decode";
import { GetPermissions } from '../helpers/GetPermissions';

export const AuthProvider = {
  login: (params) => new Promise((resolve, reject) => {
    return axios.post(BASE_URL + '/account/login', {
      email: params.username,
      password: params.password
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(request => {
      localStorage.setItem('access_token', JSON.stringify(request.data.access_token));
      localStorage.setItem('user', JSON.stringify(jwt_decode(request.data.access_token)));
      return resolve();
    }).catch(() => {
      return reject();
    });
  }),
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  checkAuth: () => new Promise((resolve, reject) => {
    if (!localStorage.getItem('access_token') || !localStorage.getItem('user')) {
      return reject();
    }

    const ticket = JSON.parse(localStorage.getItem('user'));
    const expiration = Math.floor((Date.now() / 1000) - (1000 * 60 * 5));

    if (ticket.exp < expiration) {
      return reject();
    }
    return resolve();
  }),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    user.fullName = user.username;
    return Promise.resolve(user);
  },
  getPermissions: () => {
    try {
      return Promise.resolve(GetPermissions());
    } catch (exception) {
      console.log('getPermissions error', exception)
      return Promise.resolve([]);
    }
  },
}
