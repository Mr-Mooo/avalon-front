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
import { contentSentimentListApi,mySubApi,userFollowApi } from "../services/content";
import InfiniteScroll from "react-infinite-scroller";
import emitter from "../utils/events.js";
import SearchAuthors from "../components/search-authors/all-hot-authors";
import _ from "lodash";
const { TabPane } = Tabs;

class PopoverDetail extends React.Component {
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
      const {type} = this.props.location.state
      if(type==="sub"){
          this.getSub()
      }else{
          this.userFollow()
      }
      window.addEventListener("scroll", this.scrollHandler);
  }
  scrollHandler = _.debounce(() => {
    let { type,scrollData } = this.state;
    const distance =
      document.documentElement.scrollHeight -
      document.body.clientHeight -
      document.documentElement.scrollTop;
    const top = document.documentElement.scrollTop;
    if (distance < 200 && top > scrollData) {
      this.setState({
        scrollData: top,
      });
      if(type==="sub"){
        this.getSub(true)
      }else{
        this.userFollow(true)
      }
    }
  }, 500);
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
   
  }
 componentWillReceiveProps(nextProps){
  //路由变化时判断
 console.log(nextProps,'nextProps')
    const { type } = nextProps.location.state
    if(type==="sub"){
        this.getSub()
    }else{
        this.userFollow()
    }
}
  //我的关注
  userFollow = async (value) => {
    const { data, page } = this.state;
    const options = {
      page: value ? page + 1 : 1,
      limit: 10,
    };
    const res = await userFollowApi(options);
    if (value) {
      this.setState({
        data: [...data, ...res.rows],
        page: page + 1,
      });
    } else {
      this.setState({
        data: res.rows,
      });
    }
  };
  // 我的订阅
  getSub = async (value) => {
    const { page, data } = this.state;
    const op = {
      page: value ? page + 1 : 1,
      limit: 10,
    };
    const res = await mySubApi(op);
    if (value) {
      this.setState({
        data: [...data, ...res.rows],
        page: page + 1,
      });
    } else {
      this.setState({
        data: res.rows,
      });
    }
  };

  render() {
    const { data, count } = this.state;
    return (
      <div style={{ width: "1200px", margin: "auto" }}>
        <Card className="margin-1">
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
export default withRouter(PopoverDetail);
