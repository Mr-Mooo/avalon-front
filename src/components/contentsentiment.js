import React from "react";

import { Card, Tabs, List, Spin, message, Pagination } from "antd";
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
import { contentSentimentListApi } from "../services/content";
import InfiniteScroll from "react-infinite-scroller";
import emitter from "../utils/events.js";
import SearchAuthors from "../components/search-authors/all-hot-authors";
import _ from "lodash";
const { TabPane } = Tabs;

class ContentSentiment extends React.Component {
  state = {
    data: [],
    userData: [],
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
    count: 0,
    type: "",
    options: {
      type: "recommend",
      limit: 10,
      page: 1,
      key: "",
    },
  };
  async componentDidMount() {
    const options = {
      type: "both",
    };
    const res = await contentSentimentListApi(options);
    if (res) {
      const data = res.data.rows.map((item) => {
        return {
          ...item.avl_content,
        };
      });
      this.setState({
        count: res.data.count,
        data: data,
        type: "both",
      });
    }
  }
  getData = async (options) => {
    const res = await contentSentimentListApi(options);
    if (res) {
      const data = res.data.rows.map((item) => {
        return {
          ...item.avl_content,
        };
      });
      this.setState({
        count: res.data.count,
        data: data,
      });
    }
  };
  onchange = async (page, pageSize) => {
    const { type } = this.state;
    const options = {
      page: page,
      limit: 5,
      type: type,
    };
    this.getData(options);
  };
  callback = async (key) => {
    const options = {
      page: 1,
      limit: 5,
      type: key === "1" ? "both" : key === "2" ? "picture" : "message",
    };
    this.getData(options);
    this.setState({
      type: key === "1" ? "both" : key === "2" ? "picture" : "message",
    });
  };

  render() {
    const { data, count } = this.state;
    return (
      <div style={{ width: "1200px", margin: "auto" }}>
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
                  综合
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
                  <MessageOutlined />
                  文字
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
        </Card>
        {count > 5 && (
          <Pagination
            className="margin-1"
            style={{ float: "right" }}
            defaultPageSize={5}
            defaultCurrent={1}
            onChange={(page, pageSize) => this.onchange(page, pageSize)}
            total={count > 20 ? 20 : count}
          />
        )}
      </div>
    );
  }
}
export default withRouter(ContentSentiment);
