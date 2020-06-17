import { config, myFetch } from '../utils';


// 发布动态
export const addContentApi = async options => {
    const res = await myFetch(
      `${config.base_url}/content`,
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
  
  // 获取动态数据
export const contentListApi = async options => {
  const res = await myFetch(
    `${config.base_url}/content/list`,
    // `https://goant-dev.rootant.org/ucenter/api/sme/login`,
    options,
    'GET',
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};
