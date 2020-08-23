import React from "react";

import { Card, Col, Row, Avatar, Tag, Spin, List } from "antd";

import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { followListApi, mySetApi } from "../../services/content";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";
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
      scrollData: "",
      options: {
        limit: 10,
        page: 1,
      },
    };
  }
  componentDidMount() {
    const { state } = this.props.location;
    const { options } = this.state;
    this.setState({
      routerName: state.name,
    });
    this.getUserData(options);
    window.addEventListener("scroll", this.scrollHandler);
  }
  scrollHandler = _.debounce(() => {
    let { options, page, scrollData } = this.state;
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
        limit: 10,
      };
      this.getUserData(options);
    }
  }, 500);
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
  getUserData = async (options = {}) => {
    const { data } = this.state;
    const res = await mySetApi(options);
    this.setState({
      data: [...data, ...res.rows],
      count: res.count,
      page: options.page ? options.page : 1,
    });
  };
  getData = async (options = {}) => {
    const res = await followListApi();
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
    this.getUserData(options);
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
            <InfiniteScroll>
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
