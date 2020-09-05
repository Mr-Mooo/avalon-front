import React from "react";

import {
  Button,
  Col,
  Row,
  Avatar,
  Popover,
  Divider,
  Progress,
  Badge,
  notification,
  message,
  Tabs,
  List,
} from "antd";
import { UserOutlined, CommentOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import { logoutApi, userApi } from "../services/user";
import {
  contentListApi,
  userMessageApi,
  noticeApi,
  internalnoticeApi,
} from "../services/content";
import { Link, withRouter } from "react-router-dom";
import { defaultAvatar, baseUrl } from "../utils/util";
import InfiniteScroll from "react-infinite-scroller";

const { TabPane } = Tabs;
class ProfileMessage extends React.PureComponent {
  state = {
    data: [],
    fan: 0,
    timer: "",
    message: 0,
    dataList: [],
    count: 0,
    key: "1",
    page: 1,
    limit: 10,
  };
  componentDidMount() {
    const options = {};
    this.getContentData(options);
    this.getuser();
    setInterval(() => {
      this.getuser();
    }, 1200000);
    this.noticeMessage();
    this.noticeMessageList();
  }
  noticeMessage = async () => {
    const res = await noticeApi();
    if (res) {
      this.setState({
        message: res.data.count,
      });
    }
  };
  noticeMessageList = async (key) => {
    const options = {
      limit: 10,
      page: 1,
      type:
        key === "1"
          ? "like"
          : key === "2"
          ? "comment"
          : key === "3"
          ? "super_like"
          : "recommend",
    };
    const res = await noticeApi(options);
    if (res) {
      this.setState({
        message: res.data.count,
        dataList: res.data.rows,
        count: res.data.count,
      });
    }
  };
  getMore = async () => {};
  getuser = async () => {
    const res = await userMessageApi();
    if (res) {
      this.setState({
        data: res.data,
        fan: res.data.new_fans,
      });
    }
  };
  getContentData = async (options = {}) => {
    const data1 = localStorage.getItem("userInfo");
    let user_id = data1 && JSON.parse(data1).user.user_id;
    const userRes = await userApi({ user_id: user_id });
    localStorage.setItem("userInfo", JSON.stringify(userRes));
    if (userRes) {
      console.log(userRes, "userRes");
      this.setState({
        data: userRes,
      });
    }
  };

  callback = (key) => {
    this.setState({
      key: key,
      page: 1,
      limit: 10,
      count: 0,
    });
    this.noticeMessageList(key);
    console.log(key);
  };
  internalnotice = async () => {
    const { key } = this.state;
    const options = {
      type:
        key === "1"
          ? "like"
          : key === "2"
          ? "comment"
          : key === "3"
          ? "super_like"
          : "recommend",
    };
    const res = await internalnoticeApi(options);
    if (res) {
      message.success("已读成功");
      this.noticeMessageList(key);
    }
  };
  handleInfiniteOnLoad = async () => {
    const { page, key, dataList, count } = this.state;
    if (page * 5 >= count) {
      return false;
    }

    const options = {
      limit: 10,
      page: page + 1,
      type:
        key === "1"
          ? "like"
          : key === "2"
          ? "comment"
          : key === "3"
          ? "super_like"
          : "recommend",
    };
    const res = await noticeApi(options);
    if (res) {
      this.setState({
        message: res.data.count,
        dataList: [...dataList, ...res.data.rows],
        count: res.data.count,
      });
    }
    return;
  };
  render() {
    const { data, message, dataList } = this.state;
    return (
      <Popover
        content={
          <div className="author-popover-1">
            <Tabs
              defaultActiveKey="1"
              onChange={(key) => this.callback(key)}
              style={{ paddingBottom: "40px" }}
            >
              <TabPane tab="推荐" key="1">
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  useWindow={false}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={dataList}
                    renderItem={(item) => (
                      <List.Item>
                        <Link
                          to={{
                            pathname: "/user-home",
                            state: {
                              id: item.user_id,
                              name: "user-home",
                              // user: contentData.avl_user,
                            },
                          }}
                        >
                          {item.user_name}
                        </Link>
                        推荐了你的作品
                        <Link
                          to={{
                            pathname: "/content-detail",
                            state: {
                              id: item.content_id,
                            },
                          }}
                        >
                          查看详情
                        </Link>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </TabPane>
              <TabPane tab="评论" key="2">
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  useWindow={false}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={dataList}
                    renderItem={(item) => (
                      <List.Item>
                        <Link
                          to={{
                            pathname: "/user-home",
                            state: {
                              id: item.user_id,
                              name: "user-home",
                              // user: contentData.avl_user,
                            },
                          }}
                        >
                          {item.user_name}
                        </Link>
                        评论了你的作品
                        <Link
                          to={{
                            pathname: "/content-detail",
                            state: {
                              id: item.content_id,
                            },
                          }}
                        >
                          查看详情
                        </Link>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </TabPane>
              <TabPane tab="点赞" key="3">
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  useWindow={false}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={dataList}
                    renderItem={(item) => (
                      <List.Item>
                        <Link
                          to={{
                            pathname: "/user-home",
                            state: {
                              id: item.user_id,
                              name: "user-home",
                              // user: contentData.avl_user,
                            },
                          }}
                        >
                          {item.user_name}
                        </Link>
                        点赞了你的作品
                        <Link
                          to={{
                            pathname: "/content-detail",
                            state: {
                              id: item.content_id,
                            },
                          }}
                        >
                          查看详情
                        </Link>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </TabPane>
              <TabPane tab="超赞" key="4">
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  useWindow={false}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={dataList}
                    renderItem={(item) => (
                      <List.Item>
                        <Link
                          to={{
                            pathname: "/user-home",
                            state: {
                              id: item.user_id,
                              name: "user-home",
                              // user: contentData.avl_user,
                            },
                          }}
                        >
                          {item.user_name}
                        </Link>
                        超赞了你的作品
                        <Link
                          to={{
                            pathname: "/content-detail",
                            state: {
                              id: item.content_id,
                            },
                          }}
                        >
                          查看详情
                        </Link>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </TabPane>
            </Tabs>
            <div
              style={{
                width: "300px",
                height: "40px",
                lineHeight: "40px",
                position: "absolute",
                textAlign: "center",
                cursor: "pointer",
                marginTop: "10px",
                bottom: "0",
              }}
              onClick={() => this.internalnotice()}
            >
              <Button type="primary">一键已读</Button>
            </div>
          </div>
        }
      >
        <div
          style={{
            display: "inline-block",
            width: "40px",
            height: "40px",
            verticalAlign: "middle",
          }}
        >
          <Badge
            count={message}
            style={{
              display: "inline-block",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                verticalAlign: "center",
              }}
            >
              <CommentOutlined style={{ fontSize: "36px", color: "#1890ff" }} />
            </div>
          </Badge>
        </div>
      </Popover>
    );
  }
}
export default withRouter(ProfileMessage);
