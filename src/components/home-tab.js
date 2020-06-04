import React from "react";

import { Card, Tabs, List, Spin, message } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import { CrownOutlined, HeartOutlined, TagsOutlined } from "@ant-design/icons";
import Author from "./author";
import reqwest from "reqwest";
import InfiniteScroll from "react-infinite-scroller";
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

class InfiniteList extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <Author />
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default function HomeTab() {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <Card className="margin-1">
      <Tabs defaultActiveKey="1" onChange={callback} className="home-tab">
        <TabPane
          tab={
            <span>
              <CrownOutlined />
              推荐
            </span>
          }
          key="1"
        >
          <InfiniteList />
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
          <Author />
          <Author />
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
          <Author />
          <Author />
        </TabPane>
      </Tabs>
    </Card>
  );
}
