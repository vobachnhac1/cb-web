export const translate = code => {
  if (!code) { return null; }
  return ERROR_CODES[code] || code;
};

export const ERROR_CODES = Object.freeze({

  SERVER_ERROR: 'Failed to connect to server!'

});
