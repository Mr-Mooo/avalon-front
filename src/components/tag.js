import React from "react";
import { Input, Layout, Card, Button, List, message } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import { contentListApi, subscriptApi, tagListApi } from "../services/content";
import emitter from "../utils/events.js";
import { Link, withRouter } from "react-router-dom";
import HomeTab from "./home-tab";
import Author from "./author";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";
const { Search } = Input;
const { Content } = Layout;

class Tag extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isSubscribe: false,
      page: 1,
    };
  }
  componentDidMount() {
    const { state } = this.props.location;
    const options = {
      tag_content: state.tag,
      page: 1,
      limit: 30,
    };
    this.getData(options);
    window.addEventListener("scroll", this.scrollHandler);
  }
  scrollHandler = _.debounce(() => {
    let { page, keyMesage, keyValue, scrollData } = this.state;
    const { state } = this.props.location;
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
        tag_content: state.tag,
      };
      this.getData(options);
    }
  }, 500);
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
  getData = async (options = {}) => {
    const { data } = this.state;
    const res = await tagListApi(options);
    this.setState({
      data: [...data, ...res.list.rows],
    });
  };
  refush = async () => {
    const { state } = this.props.location;
    const options = {
      tag_content: state.tag,
    };
    const res = await tagListApi(options);
    this.setState({
      data: res.list.rows,
    });
  };
  getSub = async () => {
    const { state } = this.props.location;
    const { isSubscribe } = this.state;
    const options = {
      tag_content: state.tag,
      is_delete: !isSubscribe ? 0 : 1,
    };
    const res = await subscriptApi(options);
    if (res.code === 0) {
      if (!isSubscribe) {
        message.success("订阅成功");
      } else {
        message.success("取消订阅");
      }
      this.setState({
        isSubscribe: !isSubscribe,
      });
    }
  };
  render() {
    const { state } = this.props.location;
    const { data, isSubscribe } = this.state;
    return (
      <Layout>
        <Content className="mainwidth">
          <Card style={{ marginBottom: "20px" }}>
            <h2>{state.tag}</h2>
            <h3>这是一段标签的介绍，恩，是介绍</h3>
            <Button
              type="primary"
              style={{ float: "right" }}
              onClick={() => this.getSub()}
            >
              {!isSubscribe ? "订阅" : "已订阅"}
            </Button>
          </Card>
          <Card style={{ minHeight: "calc(100vh - 400px)" }}>
            <div>
              <InfiniteScroll
              // initialLoad={false}
              // pageStart={0}
              // loadMore={this.handleInfiniteOnLoad}
              // useWindow={false}
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
                ></List>
              </InfiniteScroll>
            </div>
          </Card>
        </Content>
      </Layout>
    );
  }
}
export default withRouter(Tag);
