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
