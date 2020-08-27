import React from "react";

import { Card, Tabs, List, Spin, message } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import {
  CrownOutlined,
  HeartOutlined,
  TagsOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Author from "./author";
import reqwest from "reqwest";
import { withRouter } from "react-router-dom";
import {
  contentListApi,
  mySubApi,
  searchMessageApi,
  searchTagApi,
} from "../services/content";
import InfiniteScroll from "react-infinite-scroller";
import emitter from "../utils/events.js";
import _ from "lodash";
const { TabPane } = Tabs;

class HomeTab extends React.PureComponent {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    count: 0,
    page: 1,
    key: "",
    keyMesage: "",
    keyValue: "",
    isShow: false,
    scrollData: 0,
    selectKey: "",
    options: {
      type: "recommend",
      limit: 10,
      page: 1,
      key: "",
    },
  };
  callback = async (key) => {
    if (key === "3") {
      this.getSub();
    } else if (key === "4") {
      this.getTopic();
    } else if (key === "6") {
      this.getSearch(key);
    } else if (key === "5") {
      this.getSearch(key);
    } else {
      const options = {
        type: key === "1" ? "recommend" : key === "2" ? "follow" : "subscribe",
        limit: 5,
        page: 1,
      };
      const res = await contentListApi(options);
      this.setState({
        data: res.rows,
        keyValue: key,
        scrollData: 0,
        page: 1,
      });
    }

    this.setState({
      selectKey: key,
    });
  };
  // 搜索话题
  getTopic = async () => {
    const { keyMesage } = this.state;
    console.log(keyMesage, "ddd");
    const mes = localStorage.getItem("message");
    const options = {
      page: 1,
      limit: 50,
      key: mes,
    };
    const res = await searchTagApi(options);
    this.setState({
      data: res.rows,
    });
  };
  // 搜索图片文字
  getSearch = async (value) => {
    const { keyMesage } = this.state;
    const mes = localStorage.getItem("message");
    const options = {
      page: 1,
      limit: 50,
      key: mes,
      type: value === "5" ? "message" : "picture",
    };
    const res = await searchMessageApi(options);
    this.setState({
      data: res.rows,
    });
  };
  getSub = async () => {
    const op = {
      page: 1,
      limit: 50,
    };
    const data = await mySubApi(op);
    this.setState({
      data: data.rows,
      // keyValue: key,
      // scrollData: 0,
      // page: 1,
    });
  };
  get = (message) => {
    console.log(message, "4564");
    this.setState({
      keyMesage: message,
      data: [],
    });
  };
  componentDidMount() {
    const { options } = this.state;
    this.getContentData(options);
    const { pathname } = this.props.location;
    this.setState({
      isShow: pathname !== "/search",
    });
    const that = this;
    this.eventEmitter = emitter.addListener(
      "changeMessage",
      async (message) => {
        let option = {
          key: message,
          limit: 10,
          page: 1,
        };
        const { selectKey } = that.state;
        this.get(message);
        console.log(message, "message");
        localStorage.setItem("message", message);
        console.log(selectKey, "selectKey");
        if (selectKey === "3") {
          this.getSub();
        } else if (selectKey === "4") {
          this.getTopic();
        } else if (selectKey === "6") {
          this.getSearch(selectKey);
        } else if (selectKey === "5") {
          this.getSearch(selectKey);
        } else {
        }
        this.setState({
          keyMesage: message,
          data: [],
        });
      }
    );
    window.addEventListener("scroll", this.scrollHandler);
  }
  scrollHandler = _.debounce(() => {
    let { page, keyMesage, keyValue, scrollData } = this.state;
    const distance =
      document.documentElement.scrollHeight -
      document.body.clientHeight -
      document.documentElement.scrollTop;
    const top = document.documentElement.scrollTop;
    if (distance < 200 && top > scrollData) {
      this.setState({
        scrollData: top,
      });
      if (keyValue === "3") {
        this.getSub();
      } else {
        const options = {
          page: page + 1,
          limit: 5,
          key: keyMesage,
          type:
            keyValue === "1"
              ? "recommend"
              : keyValue === "2"
              ? "follow"
              : "subscribe",
        };
        this.getContentData(options);
      }
    }
  }, 500);
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
  // componentWillUnmount() {
  //   // 卸载时移除事件
  //   emitter.removeListener(this.eventEmitter);
  // }
  refush = async () => {
    const { options, keyValue, keyMesage } = this.state;
    const option = {
      page: 1,
      limit: 5,
      key: keyMesage,
      type:
        keyValue === "1"
          ? "recommend"
          : keyValue === "2"
          ? "follow"
          : "subscribe",
    };
    const res = await contentListApi(option);
    this.setState({
      data: res.rows,
      count: res.count,
      page: 1,
      scrollData: 0,
    });
  };

  getContentData = async (options = {}) => {
    const { data } = this.state;

    // this.setState({ loading: true })
    const res = await contentListApi(options);
    if (res) {
      localStorage.setItem("list", JSON.stringify(res));
      this.setState({
        data: data.concat(res.rows),
        count: res.count,
        page: options.page ? options.page : 1,
      });
    }
  };

  handleInfiniteOnLoad = () => {
    let { data, count, page, hasMore, keyMesage, keyValue } = this.state;
    this.setState({
      loading: true,
    });
    if (page * 5 >= count) {
      // message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return false;
    }
    const options = {
      page: page + 1,
      limit: 5,
      key: keyMesage,
      type:
        keyValue === "1"
          ? "recommend"
          : keyValue === "2"
          ? "follow"
          : "subscribe",
    };
    // const options = {};
    this.getContentData(options);

    this.setState({
      loading: false,
    });
    return;
  };
  render() {
    const { data, isShow } = this.state;
    console.log(isShow, "is");
    return (
      <Card className="margin-1">
        {isShow && (
          <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            className="home-tab"
          >
            <TabPane
              tab={
                <span>
                  <CrownOutlined />
                  推荐
                </span>
              }
              key="1"
            >
              <div>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                >
                  <List
                    dataSource={data}
                    renderItem={(item) => {
                      return (
                        <List.Item key={item.id}>
                          <Author contentData={item} refush={this.refush} />
                        </List.Item>
                      );
                    }}
                  >
                    {this.state.loading && this.state.hasMore && (
                      <div className="demo-loading-container">
                        <Spin />
                      </div>
                    )}
                  </List>
                </InfiniteScroll>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <HeartOutlined />
                  关注
                </span>
              }
              key="2"
            >
              <div>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                >
                  <List
                    dataSource={data}
                    renderItem={(item) => {
                      return (
                        <List.Item key={item.id}>
                          <Author contentData={item} refush={this.refush} />
                        </List.Item>
                      );
                    }}
                  >
                    {this.state.loading && this.state.hasMore && (
                      <div className="demo-loading-container">
                        <Spin />
                      </div>
                    )}
                  </List>
                </InfiniteScroll>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TagsOutlined />
                  订阅
                </span>
              }
              key="3"
            >
              <div>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                >
                  <List
                    dataSource={data}
                    renderItem={(item) => {
                      return (
                        <List.Item key={item.id}>
                          <Author contentData={item} refush={this.refush} />
                        </List.Item>
                      );
                    }}
                  >
                    {this.state.loading && this.state.hasMore && (
                      <div className="demo-loading-container">
                        <Spin />
                      </div>
                    )}
                  </List>
                </InfiniteScroll>
              </div>
            </TabPane>
          </Tabs>
        )}
        <div>
          {!isShow && (
            <Tabs
              defaultActiveKey="1"
              onChange={this.callback}
              className="home-tab"
            >
              <TabPane
                tab={
                  <span>
                    <CrownOutlined />
                    找人
                  </span>
                }
                key="1"
              >
                <div>
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                  >
                    <List
                      dataSource={data}
                      renderItem={(item) => {
                        return (
                          <List.Item key={item.id}>
                            <Author contentData={item} refush={this.refush} />
                          </List.Item>
                        );
                      }}
                    >
                      {this.state.loading && this.state.hasMore && (
                        <div className="demo-loading-container">
                          <Spin />
                        </div>
                      )}
                    </List>
                  </InfiniteScroll>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <MessageOutlined />
                    图片
                  </span>
                }
                key="6"
              >
                <div>
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                  >
                    <List
                      dataSource={data}
                      renderItem={(item) => {
                        return (
                          <List.Item key={item.id}>
                            <Author contentData={item} refush={this.refush} />
                          </List.Item>
                        );
                      }}
                    >
                      {this.state.loading && this.state.hasMore && (
                        <div className="demo-loading-container">
                          <Spin />
                        </div>
                      )}
                    </List>
                  </InfiniteScroll>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <MessageOutlined />
                    文字
                  </span>
                }
                key="5"
              >
                <div>
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                  >
                    <List
                      dataSource={data}
                      renderItem={(item) => {
                        return (
                          <List.Item key={item.id}>
                            <Author contentData={item} refush={this.refush} />
                          </List.Item>
                        );
                      }}
                    >
                      {this.state.loading && this.state.hasMore && (
                        <div className="demo-loading-container">
                          <Spin />
                        </div>
                      )}
                    </List>
                  </InfiniteScroll>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <MessageOutlined />
                    话题
                  </span>
                }
                key="4"
              >
                <div>
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                  >
                    <List
                      dataSource={data}
                      renderItem={(item) => {
                        return (
                          <List.Item key={item.id}>
                            <Author contentData={item} refush={this.refush} />
                          </List.Item>
                        );
                      }}
                    >
                      {this.state.loading && this.state.hasMore && (
                        <div className="demo-loading-container">
                          <Spin />
                        </div>
                      )}
                    </List>
                  </InfiniteScroll>
                </div>
              </TabPane>
            </Tabs>
          )}
        </div>
      </Card>
    );
  }
}
export default withRouter(HomeTab);
