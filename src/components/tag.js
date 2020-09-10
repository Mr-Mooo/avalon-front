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
      is_subscribe: false,
      page: 1,
    };
  }
  async componentWillReceiveProps(nextprops) {
    const { state } = this.props.location;
    if (nextprops.location.state.tag !== state.tag) {
      const options = {
        tag_content: nextprops.location.state.tag,
        page: 1,
        limit: 10,
      };
      const res = await tagListApi(options);
      if (res) {
        this.setState({
          data: res.list.rows,
        });
        document.documentElement.scrollTop = 0;
      }
    }
  }
  componentDidMount() {
    const { state } = this.props.location;
    const options = {
      tag_content: state.tag,
      page: 1,
      limit: 10,
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
    console.log(res, "dadads");
    this.setState({
      data: [...data, ...res.list.rows],
      is_subscribe: res.is_subscribe,
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
      is_subscribe: res.is_subscribe,
    });
  };
  getSub = async () => {
    const { state } = this.props.location;
    const { is_subscribe } = this.state;
    const options = {
      tag_content: state.tag,
      is_delete: !is_subscribe ? 0 : 1,
    };
    const res = await subscriptApi(options);
    if (res.code === 0) {
      if (!is_subscribe) {
        message.success("订阅成功");
        this.refush();
      } else {
        message.success("取消订阅");
        this.refush();
      }
    }
  };
  render() {
    const { state } = this.props.location;
    const { data, is_subscribe } = this.state;
    console.log(data, "data");
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
              {is_subscribe ? "已订阅" : "订阅"}
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
