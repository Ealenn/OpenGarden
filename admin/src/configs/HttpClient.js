/* eslint-disable no-unused-vars */
const fetchJson = async (url, options = {}) => {
  const requestHeaders = (options.headers ||
    new Headers({
      Accept: 'application/json',
    })
  );
  if (!requestHeaders.has('Content-Type') &&
    !(options && options.body && options.body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token);
  }
  const response = await fetch(url, { ...options, headers: requestHeaders })
  const text = await response.text()
  const o = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: text,
  };
  let status = o.status, statusText = o.statusText, headers = o.headers, body = o.body;
  let json;
  try { json = JSON.parse(body); } catch (e) { }
  if (status < 200 || status >= 300) {
    console.error(json || body);
    return Promise.reject({
      message: statusText
    });
  }
  return Promise.resolve({ status: status, headers: headers, body: body, json: json });
};

export const HttpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  options.headers.set("Authorization", `Bearer ${access_token}`);

  return fetchJson(url, options);
};
