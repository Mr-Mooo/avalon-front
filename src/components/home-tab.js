import React from "react";

import { Card, Tabs, List, Spin, message } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import { CrownOutlined, HeartOutlined, TagsOutlined } from "@ant-design/icons";
import Author from "./author";
import reqwest from "reqwest";
import { withRouter } from "react-router-dom";
import { contentListApi } from "../services/content";
import InfiniteScroll from "react-infinite-scroller";
import emitter from "../utils/events.js";
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
    options: {
      type: "recommend",
      limit: 10,
      page: 1,
      key: "",
    },
  };
  callback = async (key) => {
    console.log(key, "12");
    const options = {
      type: key === "1" ? "recommend" : key === "2" ? "follow" : "subscribe",
      limit: 10,
      page: 1,
    };
    const res = await contentListApi(options);
    this.setState({
      data: res.rows,
      keyValue: key,
    });
  };

  componentDidMount() {
    const { options } = this.state;
    this.getContentData(options);
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
        const res = await contentListApi(options);
        this.setState({
          data: res.rows,
          count: res.count,
          page: options.page ? options.page : 1,
        });
      }
    );
  }
  // componentWillUnmount() {
  //   // 卸载时移除事件
  //   emitter.removeListener(this.eventEmitter);
  // }
  refush = async () => {
    const { options } = this.state;
    const res = await contentListApi(options);
    this.setState({
      data: res.rows,
      count: res.count,
      page: options.page ? options.page : 1,
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
    const { data } = this.state;
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
            <div className="demo-infinite-container" overflow="auto">
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
            <div className="demo-infinite-container" overflow="auto">
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
            <div className="demo-infinite-container" overflow="auto">
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
      </Card>
    );
  }
}
export default withRouter(HomeTab);
