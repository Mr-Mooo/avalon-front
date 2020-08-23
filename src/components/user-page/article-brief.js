import React from "react";

import { Card, Col, Row, Avatar, Tag, Spin, List } from "antd";

import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { followListApi, mySetApi } from "../../services/content";
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
      routerName: "",
      options: {
        limit: 30,
        page: 1,
      },
    };
  }
  componentDidMount() {
    console.log("shuaxin");
    const { state } = this.props.location;
    const { options } = this.state;
    this.setState({
      routerName: state.name,
    });
    this.getFolleowData(options);
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps.location, "props");
    const { name } = prevProps.location.state;
    const { routerName, options } = this.state;
    console.log(name, routerName);
    console.log(name === routerName);
    if (routerName) {
      if (name !== routerName) {
        if (name === "my") {
          this.getFolleowData(options);
        } else if (name === "person") {
          this.getUserData(options);
        }
      }
    }
    if (name !== routerName) {
      this.setState({
        data: [],
        routerName: name,
      });
    }
  }

  getFolleowData = async (options = {}) => {
    const res = await followListApi(options);
    this.setState({
      data: res.rows,
      count: res.count,
      page: options.page ? options.page : 1,
    });
  };
  refush = async () => {
    const options = {
      page: 1,
      limit: 10,
    };
    this.getFolleowData(options);
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
    const res = await followListApi(options);
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
    const { state } = this.props.location;
    return (
      <div className="margin-1 ">
        <Card style={{ minHeight: "calc(100vh - 450px)" }}>
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
        </Card>
      </div>
    );
  }
}
export default withRouter(ArticleBrief);
