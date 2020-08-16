import { config, myFetch } from "../utils";
// 发布动态
export const addContentApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content`,
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

// 获取动态数据
export const contentListApi = async (options) => {
  const res = await myFetch(`${config.base_url}/content/list`, options, "GET");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};

// 去点赞
export const Dianzan = async (options) => {
  const res = await myFetch(`${config.base_url}/content/like`, options, "POST");
  return res;
};
// 去超赞
export const chaozan = async (options) => {
  const res = await myFetch(`${config.base_url}/content/add/superlike`, options, "POST");
  return res;
};
// 关注
export const guanzhu = async (options) => {
  const res = await myFetch(`${config.base_url}/user/follow`, options, "POST");
  return res;
};

// 去推荐
export const gotuijian = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/recommend`,
    options,
    "POST"
  );
  return res;
};

// 得到评论列表
export const gogetComment = async (options) => {
  const res = await myFetch(`${config.base_url}/comment`, options, "GET");
  return res;
};
// 上传图片
export const uploadImg = async (options) => {
  const res = await myFetch(`${config.base_url}/upload/params`, options, "GET");
  return res;
};

// 去评论
export const goComment = async (options) => {
  const res = await myFetch(`${config.base_url}/comment`, options, "POST");
  return res;
};

// 去屏蔽
export const gopinbi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/unfollow`,
    options,
    "POST"
  );
  return res;
};

// 去投诉
export const gotousu = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/complaint`,
    options,
    "POST"
  );
  return res;
};
