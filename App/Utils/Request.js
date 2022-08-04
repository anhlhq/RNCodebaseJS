import {AxiosRequestHeaders, Method, AxiosError} from 'axios';
import queryString from 'query-string';
import api from 'Services/Axios';

const buildURL = (url, query) => {
  let _url = url;
  if (query) {
    _url += /\?/.test(url) ? `&` : `?`;
    if (typeof query === `object`) {
      _url += queryString.stringify(query);
    } else {
      _url += query;
    }
  }
  return _url;
};

export const Request = async ({
  method = 'get',
  url,
  query,
  params,
  success,
  failure,
  headers,
}) => {
  const axiosMethod = api[method];

  try {
    const result =
      method === 'get'
        ? await axiosMethod(buildURL(url, query), {headers})
        : await axiosMethod(buildURL(url, query), params, {headers});
    if (result.status === 200 || result.status === 201) {
      success?.(result.data);
      return result;
    }
    throw result;
  } catch (error) {
    failure?.({
      message: error?.message,
    });
  }
};
