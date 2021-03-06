import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + sessionStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

const loginRequestSender = (options, token) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    recaptchaToken: token,
  });

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!sessionStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export function login(loginRequest, recaptchaToken) {
  console.log("TR IN LOGIN FUNCTION IS: " + recaptchaToken);

  return loginRequestSender(
    {
      url: API_BASE_URL + "/auth/login",
      method: "POST",
      body: JSON.stringify(loginRequest),
    },
    recaptchaToken
  );
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}
