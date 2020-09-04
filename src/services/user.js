import { config, myFetch } from "../utils";
// import { myFetch } from '../utils/myFetch';
// import '../utils';

// 登录
export const loginApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/login`,
    // `https://goant-dev.rootant.org/ucenter/api/sme/login`,
    options,
    "POST"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};

// 登出
export const logoutApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/logout`,
    // `https://goant-dev.rootant.org/ucenter/api/sme/login`,
    options,
    "POST"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};
// 发送 otp
export const sendOtpApi = async (options) => {
  const res = await myFetch(`${config.base_url}/send/notice`, options, "POST");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};
// signUp
export const signUpApi = async (options) => {
  const res = await myFetch(`${config.base_url}/user/create`, options, "POST");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};

export const userApi = async (options) => {
  const res = await myFetch(`${config.base_url}/user/info`, options, "GET");
  if (res && res.code === 0) {
    return res.data;
  }
};
