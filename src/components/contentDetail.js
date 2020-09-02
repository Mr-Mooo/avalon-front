import React from "react";

import {
  Card,
  Tabs,
  List,
  Spin,
  Row,
  Col,
  message,
  Pagination,
  Layout,
  Avatar,
  Tag,
  Divider,
  Input,
} from "antd";
import "antd/dist/antd.css";
import "../index.css";
import {
  CrownOutlined,
  HeartOutlined,
  TagsOutlined,
  MessageOutlined,
  UserOutlined,
  LikeOutlined,
  RotateRightOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import Author from "./author";
import reqwest from "reqwest";
import { withRouter } from "react-router-dom";
import {
  contentdetailApi,
  chaozan,
  Dianzan,
  gotuijian,
  gogetComment,
  goComment,
} from "../services/content";
import { defaultAvatar } from "../utils/util";
import InfiniteScroll from "react-infinite-scroller";
import emitter from "../utils/events.js";
import Hotcontent from "./hotcontent";
import Toptopic from "./toptopic";
import HomeTab from "./home-tab";
import HomeShoppingTab from "./home-shopping-tab";
import SearchAuthors from "../components/search-authors/all-hot-authors";
import _ from "lodash";
const { TabPane } = Tabs;
const { Search } = Input;
const { Content } = Layout;
class ContentDetail extends React.Component {
  state = {
    data: [],
    id: "",
    commentList: [],
    replyId: "",
    defaultValue: "",
    isShowReplay: "",
    replayData: [],
    userId: "",
    contentId: "",
    defaultFValue: "",
    isShow: false,
  };
  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { state } = this.props.location;
    const options = {
      content_id: state.id,
    };
    const res = await contentdetailApi(options);
    if (res) {
      this.setState({
        data: res.data,
        id: res.data.content_id,
      });
      this.gogetComment(res.data.content_id);
    }
  };
  reply = (item) => {
    const { replyId } = this.state;
    if (item.comment_id === replyId) {
      this.setState({
        replyId: "",
        userId: "",
        contentId: "",
      });
    } else {
      const { comment_id, create_user, content_id } = item;
      this.setState({
        replyId: comment_id,
        userId: create_user,
        contentId: content_id,
      });
    }
  };
  // 评论
  getFSearch = async (value) => {
    const { id } = this.state;
    const options = {
      content: value,
      content_id: id,
    };
    const addRes = await goComment(options);
    if (addRes && addRes.success) {
      message.success("评论成功");
      this.gogetComment(id);
      this.setState({
        defaultFValue: "",
      });
    }
  };
  // 回复评论
  getSearch = async (value, item) => {
    console.log(value, "123");
    const { contentId, replyId, userId, isShowReplay } = this.state;
    const options = {
      content: value,
      pid: replyId,
      ref_id: userId,
      content_id: contentId,
    };
    const res = await goComment(options);
    if (res.message === "success") {
      message.success("回复成功");
      this.gogetComment(contentId);
      this.setState({
        defaultValue: "",
      });
      if (isShowReplay) {
        this.openReply(isShowReplay);
      }
    }
  };
  getFValue = (e) => {
    this.setState({
      defaultFValue: e.target.value,
    });
  };
  // 获取input变化值
  getchangeValue = (e) => {
    this.setState({
      defaultValue: e.target.value,
    });
  };
  //获取二级评论
  openReply = async (value) => {
    const options = {
      pid: value.comment_id,
      content_id: value.content_id,
    };
    const res = await gogetComment(options);
    this.setState({
      replayData: res.data.rows,
      isShowReplay: value,
    });
  };
  gogetComment = async (id) => {
    let options = {
      pid: 0,
      content_id: id,
    };
    this.setState({
      id: id,
    });
    const addRes = await gogetComment(options);

    if (addRes && addRes.success) {
      console.log(addRes, "aa");
      this.setState({ commentList: [] }, () => {
        this.setState({ commentList: addRes.data.rows });
      });
    }
  };
  // 点赞
  goDianzan = async (id, isLike) => {
    let options = {
      content_id: id,
      is_delete: isLike ? 1 : 0,
    };
    const addRes = await Dianzan(options);
    if (addRes && addRes.success) {
      if (isLike) {
        message.success("成功取消");
        this.getData();
      } else {
        message.success("点赞成功");
        this.getData();
      }
    }
  };
  // 推荐
  gotuijian = async (id) => {
    let options = {
      content_id: id,
      is_delete: 0,
    };
    const addRes = await gotuijian(options);
    if (addRes && addRes.success) {
      message.success("推荐成功");
      this.getData();
    }
  };
  goTag = (item) => {
    this.props.history.push({ pathname: "/tag", state: { tag: item } });
  };
  // 超赞
  chaozan = async (id, isLike) => {
    let options = {
      content_id: id,
    };
    const addRes = await chaozan(options);
    if (addRes && addRes.success) {
      message.success("点赞成功");
      this.getData();
    }
  };
  openValue = () => {
    this.setState({
      isShow: true,
    });
  };
  render() {
    const {
      data,
      count,
      commentList,
      replyId,
      defaultValue,
      isShowReplay,
      replayData,
      defaultFValue,
      isShow,
    } = this.state;
    const { avl_user, content, avl_attachments, tag } = data;
    console.log(data, "12");
    return (
      <Layout>
        <Content className="mainwidth">
          <Row>
            <Col xs={24} sm={24} md={18} lg={18}>
              <Card className="margin-1">
                <Row>
                  <Col span={3} style={{ textAlign: "right", marginRight: 20 }}>
                    <Avatar
                      size={64}
                      src={
                        avl_user && avl_user.avatar
                          ? avl_user.avatar
                          : defaultAvatar
                      }
                      icon={<UserOutlined />}
                    />
                  </Col>
                  <Col span={20}>
                    <h2>{avl_user && avl_user.nick_name}</h2>
                    <p>{content && content}</p>
                    <p>
                      {avl_attachments &&
                        avl_attachments.map((item, index) => {
                          return (
                            <img
                              src={`https://avl-dev.obs.cn-east-2.myhuaweicloud.com/${item.path}`}
                              className="margin-author-img"
                              key={index}
                              style={{ width: 200, height: 200 }}
                            />
                          );
                        })}
                    </p>
                    <p>
                      {tag &&
                        tag.map((item, index) => {
                          return (
                            <Tag
                              key={index}
                              onClick={() => this.goTag(item)}
                              style={{
                                border: "1px solid #2db7f5",
                                cursor: "pointer",
                              }}
                            >
                              {item}
                            </Tag>
                          );
                        })}
                    </p>
                    <Divider />
                    <Row>
                      <Col span={6}>
                        <div
                          className="iconShow"
                          onClick={() => this.gotuijian(data.content_id)}
                        >
                          推荐
                          <RotateRightOutlined
                            className="margin-sm"
                            style={{
                              color: data.is_recommend ? "#1890ff" : "",
                            }}
                          />
                          {data.recommend_number}
                        </div>
                      </Col>
                      <Col span={6}>
                        <div
                          className="iconShow"
                          onClick={() => this.openValue()}
                        >
                          评论
                          <MessageOutlined className="margin-sm" />
                          {data.comment_number}
                        </div>
                      </Col>
                      <Col span={6}>
                        <div
                          className="iconShow"
                          onClick={() =>
                            this.goDianzan(data.content_id, data.is_like)
                          }
                        >
                          点赞
                          <LikeOutlined
                            className="margin-sm"
                            style={{
                              color: data.is_like ? "#1890ff" : "",
                            }}
                          />
                          {data.like_number}
                        </div>
                      </Col>
                      <Col span={6}>
                        <div
                          className="iconShow"
                          onClick={() => this.chaozan(data.content_id)}
                        >
                          超赞
                          <CrownOutlined className="margin-sm" />
                          {data.collect_number}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Divider />
                <div>
                  {isShow && (
                    <Search
                      placeholder="请输入评论内容"
                      enterButton="评论"
                      size="large"
                      onChange={(e) => this.getFValue(e)}
                      value={defaultFValue}
                      onSearch={(value) => this.getFSearch(value)}
                    />
                  )}
                </div>
                <List
                  itemLayout="horizontal"
                  dataSource={commentList}
                  renderItem={(item, index) => {
                    return (
                      <div key={index}>
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                src={defaultAvatar}
                                icon={<UserOutlined />}
                              />
                            }
                            title={item.nick_name}
                            description={item.content}
                            onClick={() =>
                              this.setComment(item.pid, item.ref_id)
                            }
                          />
                        </List.Item>
                        <div
                          className="replay"
                          onClick={() => this.reply(item)}
                        >
                          回复
                        </div>
                        {replyId === item.comment_id && (
                          <div
                            style={{
                              // width: 420,
                              marginLeft: 50,
                              marginBottom: 10,
                            }}
                          >
                            <Search
                              placeholder="请输入回复内容"
                              enterButton="评论"
                              // size="small"
                              onChange={(e) => this.getchangeValue(e)}
                              value={defaultValue}
                              onSearch={(value) => this.getSearch(value)}
                            />
                          </div>
                        )}
                        {item.count > 0 && (
                          <div style={{ marginLeft: 50 }}>
                            <span
                              style={{
                                color: "#1890ff",
                                cursor: "pointer",
                                marginLeft: 5,
                              }}
                              onClick={() => this.openReply(item)}
                            >
                              共{item.count}条回复
                            </span>
                          </div>
                        )}
                        <div>
                          {isShowReplay.comment_id === item.comment_id &&
                            replayData.map((ele, number) => {
                              return (
                                <div style={{ marginLeft: 50 }} key={number}>
                                  <span
                                    style={{
                                      color: "#1890ff",
                                      marginRight: 5,
                                    }}
                                  >
                                    {ele.create_user_name
                                      ? ele.create_user_name
                                      : "名称"}
                                    ：
                                  </span>
                                  <span>{ele.content}</span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
              <HomeShoppingTab />
              <Hotcontent name="author" />
              <Hotcontent name="content" />
              <Toptopic />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
export default withRouter(ContentDetail);
