import axios from 'axios';
import nookies from 'nookies';

export const HttpRequest = async (config, accessToken) => {
  try {
    const token = accessToken || getAuthToken();
    const headers = {
      Accept: '*/*',
      'Content-Type': 'application/json',
      ...config.headers,
    };
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }
    const configRequest = {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 45_000,
      headers,
      ...config,
    };
    const result = await axios(configRequest);
    if (result.data) {
      return responseModel({ data: result.data, message: null, success: true });
    }
    return responseModel({ data: null, message: null, success: true });
  } catch (error) {
    return responseModel({ data: null, message: error, success: false });
  }
};

function getAuthToken(context) {
  return nookies.get(context)?.accessToken;
}
