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
