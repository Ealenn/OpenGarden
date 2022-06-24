/* eslint-disable import/no-anonymous-default-export */
import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';

export default (apiUrl, httpClient = fetchUtils.fetchJson): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      offset: (page - 1) * perPage,
      limit: perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has('content-range')) {
        throw new Error(
          'The Content-Range header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
        );
      }
      return {
        data: json[resource],
        total: parseInt(
          headers.get('content-range').split('/').pop(),
          10
        ),
      };
    });
  },

  getOne: (resource, params) => {
    console.log('getOne', resource, params);
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    }))
  },

  getMany: (resource, params) => {
    console.log('getMany', resource, params);
    const query = {
      id: params.ids,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json[resource] }))
  },

  getManyReference: (resource, params) => {
    console.log('getManyReference', resource, params);
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}/${params.id}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has('Content-Range')) {
        throw new Error(
          'The Content-Range header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
        );
      }
      console.log(json);
      return {
        data: [json],
        total: parseInt(
          headers.get('Content-Range').split('/').pop(),
          10
        ),
      };
    });
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        })
      )
    ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
});
