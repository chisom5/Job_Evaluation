import axios from "axios";

export const authHttpRequest = (url, data = {}, method, params = {}) => {
  return axios({
    url,
    method,
    data,
    params,
    headers: {
      Accept: "application/json, text/plain */*",
      "Content-Type": "application/json",
    },
  }).then((res) => res);
};

export const makeHttpExportRequest = (url, data, method, params = {}) => {
  const user = JSON.parse(sessionStorage.getItem("JOB_EVAL_XXX"));

  return axios({
    url,
    data,
    method,
    params,
    responseType: 'arraybuffer',
    headers: {
      Accept: "application/json, text/plain */*",
      Auth: `${user.session_id}`,
    },
  }).then((res) => res);
};

export const makeHttpRequest = (url, data, method, params = {}) => {
  const user = JSON.parse(sessionStorage.getItem("JOB_EVAL_XXX"));

  return axios({
    url,
    data,
    method,
    params,
    headers: {
      Accept: "application/json, text/plain */*",
      Auth: `${user.session_id}`,
    },
  }).then((res) => res);
};

