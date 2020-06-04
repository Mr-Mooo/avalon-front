import myFetch from '../utils/myFetch';

const config = {
  base_url: 'https://www.baidu.com',
};

// 登录
export const loginApi = async options => {
  const ucenter_url = 'test';
  const res = await myFetch(
    // `${config.base_url}/${ucenter_url}`,
    `https://goant-dev.rootant.org/ucenter/api/sme/login`,
    options,
    'POST',
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};
