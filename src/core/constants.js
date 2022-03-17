export const REQ_HEADER_AUTHORIZATION = 'Authorization';

export const REQ_HEADER_AUTH_TOKEN_TYPE = 'Bearer ';

export const REQ_HEADER_ACCEPT_LANG = 'Accept-Language';

export const REQ_HEADER_CONTENT_TYPE = 'Content-Type';

export const REQ_CONTENT_TYPE = Object.freeze({
  JSON: 'application/json',
  FORM: 'multipart/form-data'
});

export const DEFAULT_PAGINATION = Object.freeze({
  page:     1,
  total:    0,
  pageSize: 10
});

export const DATE_FORMAT = 'MM/DD/yyyy';
export const DATE_TIME_FORMAT = 'HH:mm MM/DD/yyyy';

export const STATUS_CODE = {
  SUCCESS:                   200,
  SUCCESS_CREATE:            201,
  SUCCESS_UPDATE_NO_CONTENT: 204,
  ERROR_BAD_REQUEST:         400,
  ERROR_UNAUTHORIZED:        401,
  ERROR_FORBIDDEN:           403,
  ERROR_NOT_FOUND:           404,
  ERROR_METHOD_NOT_ALLOW:    405,
  ERROR_NOT_IMPLEMENTED:     501,
  ERROR_BAD_GATEWAY:         502,
  ERROR_SERVICE_UNAVAILABLE: 503
};
