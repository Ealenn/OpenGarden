import { fetchUtils } from 'react-admin';

export const HttpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const access_token = JSON.parse(localStorage.getItem("auth"));
  options.headers.set("Authorization", `Bearer ${access_token}`);
  return fetchUtils.fetchJson(url, options);
};
