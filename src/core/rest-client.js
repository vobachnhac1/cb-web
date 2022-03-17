import _ from 'lodash';
import axios from 'axios';
import * as CONST from './constants';
// import { SERVER_LOCATION } from '@env';
import { ERROR_CODES } from './error-codes';

const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

export class RestClientCreator {
  constructor(options = {}) {
    this.axiosInstance = axios.create({
      ...options,
      baseURL: "http://203.205.26.244:7005/" // 'https://weathermanagementdev.azurewebsites.net'
    });
    this.axiosInstance.defaults.headers.common[CONST.REQ_HEADER_CONTENT_TYPE] = CONST.REQ_CONTENT_TYPE.JSON;
    this.axiosInstance.defaults.timeout = 20000;
  }

  setAccessToken = (token) => {
    if (!token) {
      delete this.axiosInstance.defaults.headers.common[CONST.REQ_HEADER_AUTHORIZATION];
      return;
    }

    const authInfo = CONST.REQ_HEADER_AUTH_TOKEN_TYPE + token;
    this.axiosInstance.defaults.headers.common[CONST.REQ_HEADER_AUTHORIZATION] = authInfo;
  }

  setInterceptors(request = {}, response = {}) {
    injectInterceptor(this.axiosInstance, {
      ...request,
      ...{ type: 'request' }
    });
    injectInterceptor(this.axiosInstance, {
      ...response,
      ...{ type: 'response' }
    });
  }

  async get(url, requestParams = {}, headers = {}) {
    if (!_.isString(url)) { throw new Error('String value of URL must correct'); }
    return await sendRequest(
      this.axiosInstance,
      url,
      REQUEST_METHOD.GET,
      headers,
      requestParams,
      {}
    );
  }

  async post(url, requestBody = {}, headers = {}) {
  }

  async put(url, requestBody = {}, headers = {}) {
    if (!_.isString(url)) { throw new Error('String value of URL must correct'); }
    return await sendRequest(
      this.axiosInstance,
      url,
      REQUEST_METHOD.PUT,
      headers,
      {},
      requestBody
    );
  }

  async patch(url, requestBody = {}, headers = {}) {
    if (!_.isString(url)) { throw new Error('String value of URL must correct'); }
    return await sendRequest(
      this.axiosInstance,
      url,
      REQUEST_METHOD.PATCH,
      headers,
      {},
      requestBody
    );
  }

  async delete(url, requestParams = {}, headers = {}) {
    if (!_.isString(url)) { throw new Error('String value of URL must correct'); }
    return await sendRequest(
      this.axiosInstance,
      url,
      REQUEST_METHOD.DELETE,
      headers,
      requestParams,
      {}
    );
  }

  async upload(url, requestBody = {}, headers = {}) {
    if (!_.isString(url)) { throw new Error('String value of URL must correct'); }
    headers[CONST.REQ_HEADER_CONTENT_TYPE] = CONST.REQ_CONTENT_TYPE.FORM;
    return await sendRequest(
      this.axiosInstance,
      url,
      REQUEST_METHOD.POST,
      headers,
      {},
      requestBody
    );
  }

  async request(
    url,
    method,
    headers = {},
    requestParams = {},
    requestBody = {}
  ) {
    if (!_.includes(_.keys(REQUEST_METHOD), method) || !_.isString(url)) {
      throw new Error('HTTPClient only support [GET, POST, PUT, DELETE]');
    }
    return readRestResponse(await sendRequest(
      this.axiosInstance,
      url,
      method,
      headers,
      requestParams,
      requestBody
    ));
  }
}

const SUPPORT_REQ_BODY = [REQUEST_METHOD.POST, REQUEST_METHOD.PUT, REQUEST_METHOD.PATCH];

const sendRequest = async (
  _axios,
  url,
  method,
  headers = {},
  requestParams,
  requestBody
) => {
  let params = {};
  if (!_.isEmpty(requestParams)) {
    params = new URLSearchParams(requestParams);
  }

  let data = {};
  if (_.includes(SUPPORT_REQ_BODY, method)) {
    data = requestBody;
  }

  let transformRequest = [
    rawData => {
      if (_.isString(rawData) || isFormData(rawData)) {
        return rawData;
      } else if (_.isObject(rawData)) {
        return JSON.stringify(rawData);
      }
      throw new Error('Request body must belong with [String, Object, FormData]');
    }
  ];

  let transformResponse = [
    response => {
      return response;
    }
  ];

  let opts = {
    method,
    params,
    headers: {
      ..._axios.defaults.headers.common,
      ..._axios.defaults.headers[method],
      ...headers
    },
    data: data || {},
    transformRequest,
    transformResponse
  };
  return await readRestResponse(_axios.request(url, opts));
};

const toObject = urlParams => {
  if (urlParams instanceof URLSearchParams) {
    let result = {};
    for (let pair of urlParams.entries()) {
      result[pair[0]] = pair[1];
    }
  }
  return {};
};

const injectInterceptor = (_axios, interceptor) => {
  let successHandler = interceptor[interceptor.type];
  if (!_.isFunction(successHandler)) { successHandler = success => success; }

  let failHandler = interceptor.error;
  if (!_.isFunction(failHandler)) { failHandler = error => error; }

  _axios.interceptors[interceptor.type].use(successHandler, failHandler);
};

const isFormData = val => {
  return typeof FormData !== 'undefined' && val instanceof FormData;
};

/**
 * The first check empty response to ignore CORS request
 */
const readRestResponse = async (resolve) => {
  try {
    const resp = await new Promise.resolve(resolve);
    if (resp.status === 200) {
      return { success: true, data: resp.data };
    } else if (resp.status === 204) {
      return { success: true, data: resp.data || null };
    } else {
      return { status: resp.status, success: true, data: resp.data || null };
    }
  } catch (error) {
    console.log(error);
    const { response: { data } } = error;
    if (data) {
      return { success: false, data: JSON.parse(data) };
    }
  }
  return { success: false, error: 'Không thể connect server tại thời điểm này' };
};

export const parseRequestParams = params => {
  if (_.isNil(params)) { return {}; }

  if (_.startsWith(params, 'http://') || _.startsWith(params, 'https://')) {
    let url = URL(params);
    return toObject(new URLSearchParams(url.search));
  }

  if (_.isString(params)) {
    return toObject(new URLSearchParams(params));
  }

  return {};
};

export const RestClient = new RestClientCreator();
export default RestClient;
