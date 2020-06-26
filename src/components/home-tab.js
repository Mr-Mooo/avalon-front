import React from "react";

import { Card, Tabs, List, Spin, message } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import { CrownOutlined, HeartOutlined, TagsOutlined } from "@ant-design/icons";
import Author from "./author";
import reqwest from "reqwest";
import { withRouter } from "react-router-dom";
import { contentListApi } from '../services/content';
import InfiniteScroll from "react-infinite-scroller";
const { TabPane } = Tabs;

class HomeTab extends React.PureComponent {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    count: 0,
    page: 1,
  };
  callback(key) {
    console.log(key);
  }


  componentDidMount() {
    const options = {};
    this.getContentData(options);

    // window.addEventListener('scroll', this.handleInfiniteOnLoad);
  }

  getContentData = async (options = {}) => {
    const { data } = this.state
    // this.setState({ loading: true })
    const res = await contentListApi(options);
    console.log(res)
    console.log(777777777654345678909876543456789765434567)
    if (res) {
      console.log(options)
      this.setState({
        data: data.concat(res.rows),
        count: res.count,
        page: options.page ? options.page : 1,
        // loading: false
      });
    }
  }

  handleInfiniteOnLoad = () => {
    let { data, count, page, hasMore } = this.state;
    this.setState({
      loading: true
    });
    if (page * 5 >= count) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return false;
    }
    const options = {
      page: page + 1,
      limit: 5,
    };
    // const options = {};
    this.getContentData(options);

    this.setState({
      loading: false
    });
    return;
  };
  render() {
    const { data } = this.state
    return (
      <Card className="margin-1">
        <Tabs defaultActiveKey="1" onChange={this.callback} className="home-tab">
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
                  renderItem={item => {
                    return (
                      <List.Item key={item.id}>
                        <Author contentData={item} />
                      </List.Item>
                    )
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
}
export default withRouter(HomeTab);



