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
import { contentListApi } from "../services/content";
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
    options: {
      type: "recommend",
      limit: 10,
      page: 1,
      key: "",
    },
  };
  callback = async (key) => {
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
  };

  componentDidMount() {
    const { options } = this.state;
    this.getContentData(options);
    const { pathname } = this.props.location;

    this.setState({
      isShow: pathname !== "/search",
    });
    this.eventEmitter = emitter.addListener(
      "changeMessage",
      async (message) => {
        let option = {
          key: message,
          type: "recommend",
          limit: 10,
          page: 1,
        };
        this.setState({
          keyMesage: message,
          data: [],
        });
        const res = await contentListApi(option);
        this.setState({
          data: res.rows,
          count: res.count,
          page: options.page ? options.page : 1,
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
    return (
      <Card className="margin-1">
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
          {!isShow && (
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
          )}
        </Tabs>
      </Card>
    );
  }
}
export default withRouter(HomeTab);
