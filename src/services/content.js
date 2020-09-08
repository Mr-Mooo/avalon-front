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
// 一键已读 /user/internal/notice/all
export const internalnoticeApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/internal/notice/all`,
    options,
    "POST"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
//已读消息
export const readmessageApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/internal/notice`,
    options,
    "POST"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 粉丝列表 /user/fans/list
export const fansListApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/fans/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 已粉丝列表
export const readfansApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/read/fans`,
    options,
    "POST"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 获取用户个人信息
export const userMessageApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/info/personal`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 未读消息
export const noticeApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/internal/notice/count`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 未读消息列表
export const noticelistApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/internal/notice/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 推荐标签
export const defaulttagApi = async (options) => {
  const res = await myFetch(`${config.base_url}/default/tag`, options, "GET");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 我的关注
export const userFollowApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/follow/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 话题人气榜单(simple)
export const topSentimentApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/tag/top/list/simple`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 话题人气榜单
export const topSentimentListApi = async (options) => {
  const res = await myFetch(`${config.base_url}/tag/top/list`, options, "GET");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 删除内容
export const deteleContentlApi = async (options) => {
  const res = await myFetch(`${config.base_url}/content`, options, "DELETE");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 内容详情
export const contentdetailApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/detail`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 内容人气榜单(simple)
export const contentSentimentApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/top/list/simple`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 内容人气榜单
export const contentSentimentListApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/top/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 用户人气榜单(simple)
export const userSentimentApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/top/list/simple`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 用户人气榜单
export const userSentimentListApi = async (options) => {
  const res = await myFetch(`${config.base_url}/user/top/list`, options, "GET");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 找人
export const searchUserApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/search/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 主页列表
export const homePageApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/user/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};

//上传头像
export const uploadavatartApi = async (options) => {
  const res = await myFetch(`${config.base_url}/user/avatar`, options, "PUT");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
//修改用户资料
export const updateDataApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/user/info/modify`,
    options,
    "PUT"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};
// 收藏
export const collectionApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/collection`,
    options,
    "POST"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};

// 订阅按钮
export const subscriptApi = async (options) => {
  const res = await myFetch(`${config.base_url}/follow/tag`, options, "POST");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res;
  }
  return false;
};

// 我发布的动态
export const mySetApi = async (options) => {
  const res = await myFetch(`${config.base_url}/content/user`, options, "GET");
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};
// 详情tag列表
export const tagListApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/tag/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};
// 搜索tag数据
export const searchTagApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/search/tag/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};
// 我的订阅
export const mySubApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/follow/tag/list`,
    options,
    "GET"
  );
  // console.log(res, 'res');
  if (res && res.code === 0) {
    return res.data;
  }
  return false;
};

// 搜索(图片、文字)数据
export const searchMessageApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/search/list`,
    options,
    "GET"
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

// 获取我的收藏
export const followListApi = async (options) => {
  const res = await myFetch(
    `${config.base_url}/content/follow/list`,
    options,
    "GET"
  );
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
  const res = await myFetch(
    `${config.base_url}/content/add/superlike`,
    options,
    "POST"
  );
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
