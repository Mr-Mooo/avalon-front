import { config, myFetch } from '../utils';
// import { myFetch } from '../utils/myFetch';
// import '../utils';


// 登录
export const loginApi = async options => {
  const res = await myFetch(
    `${config.base_url}/user/login`,
    // `https://goant-dev.rootant.org/ucenter/api/sme/login`,
    options,
    'POST',
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};

// 登出
export const logoutApi = async options => {
  const res = await myFetch(
    `${config.base_url}/user/logout`,
    // `https://goant-dev.rootant.org/ucenter/api/sme/login`,
    options,
    'POST',
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};

