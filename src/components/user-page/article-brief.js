import React from "react";

import { Card, Col, Row, Avatar, Tag, Spin, List } from "antd";

import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { contentListApi } from "../../services/content";
import InfiniteScroll from "react-infinite-scroller";
import {
  CrownOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  RotateRightOutlined,
} from "@ant-design/icons";
import Author from "../author.js";
class ArticleBrief extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      keyMesage: "",
      count: "",
      page: "",
      options: {
        type: "recommend",
        limit: 5,
        page: 1,
        key: "",
      },
    };
  }
  componentDidMount() {
    const { options } = this.state;
    this.getData(options);
    // this.eventEmitter = emitter.addListener(
    //   "changeMessage",
    //   async (message) => {
    //     let option = {
    //       key: message,
    //       type: "recommend",
    //       limit: 10,
    //       page: 1,
    //     };
    //     this.setState({
    //       keyMesage: message,
    //       data: [],
    //     });
    //     const res = await contentListApi(option);
    //     this.setState({
    //       data: res.rows,
    //       count: res.count,
    //       page: options.page ? options.page : 1,
    //     });
    // }
    // );
  }
  getData = async (options = {}) => {
    const res = await contentListApi(options);
    this.setState({
      data: res.rows,
      count: res.count,
      page: options.page ? options.page : 1,
    });
  };
  refush = async () => {
    const { options } = this.state;
    const res = await contentListApi(options);
    this.setState({
      data: res.rows,
      count: res.count,
      page: options.page ? options.page : 1,
    });
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
      type: "recommend",
    };
    // const options = {};
    this.getContentData(options);

    this.setState({
      loading: false,
    });
    return;
  };
  getContentData = async (options = {}) => {
    const { data } = this.state;

    // this.setState({ loading: true })
    const res = await contentListApi(options);
    if (res) {
      this.setState({
        data: data.concat(res.rows),
        count: res.count,
        page: options.page ? options.page : 1,
      });
    }
  };
  render() {
    const { data } = this.state;
    return (
      <div className="margin-1 ">
        <Card>
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
        </Card>
      </div>
    );
  }
}
export default withRouter(ArticleBrief);
