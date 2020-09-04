import React from "react";

import {
  Col,
  Row,
  Avatar,
  Button,
  Divider,
  Card,
  Pagination,
  Select,
} from "antd";
import "antd/dist/antd.css";
import {
  UserOutlined,
  SmileOutlined,
  MailOutlined,
  WeiboOutlined,
  WechatOutlined,
  EllipsisOutlined,
  TaobaoCircleOutlined,
} from "@ant-design/icons";

import ImageWall from "./image-wall";
import SearchNav from "../search";
import { Link, withRouter } from "react-router-dom";
import { userApi } from "../../services/user";
import ArticleBrief from "./article-brief";

const { Option } = Select;

class UserPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      follow_count: 0,
      content_count: 0,
      be_follow_count: 0,
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    const id = JSON.parse(localStorage.getItem("userInfo"));
    const options = {
      limit: 10,
      page: 1,
      user_id: id.user.user_id,
    };
    const res = await userApi(options);
    if (res) {
      this.setState({
        follow_count: res.user.follow_count,
        content_count: res.user.content_count,
        be_follow_count: res.user.be_follow_count,
      });
    }
  };
  render() {
    let isShow =
      this.props.location.state &&
      (this.props.location.state.name === "my" ||
        this.props.location.state.name === "person");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { follow_count, content_count, be_follow_count } = this.state;
    return (
      <div className="mainwidth">
        <Card className="margin-1 align-center">
          <div className="">
            {" "}
            <Avatar
              className="margin-bt-sm"
              size={64}
              icon={<UserOutlined />}
            />
            <p>作者昵称：{userInfo.user.nick_name}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet.
            </p>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col span={1}>关注 {follow_count}</Col>
              <Col span={1}>粉丝 {be_follow_count}</Col>
              <Col span={1}>投稿 {content_count}</Col>
            </Row>
            {!isShow && (
              <div>
                <Divider />
                <Button type="primary" size="small" className="margin-sm">
                  <SmileOutlined />
                  关注
                </Button>
                <Button size="small" className="margin-sm">
                  <MailOutlined /> 私信
                </Button>
              </div>
            )}
          </div>
        </Card>
        {/* <Col span={8}>
          <Card className="margin-1">
            <Row className="align-center">
              <Col span={8}>
                {" "}
                <h3>
                {userInfo.user.follow_count}
                  <br />
                  关注
                </h3>
              </Col>

              <Col span={8}>
                <h3>
                {userInfo.user.be_follow_count}
                  <br />
                  粉丝
                </h3>
              </Col>
              <Col span={8}>
                <h3>
                {userInfo.user.content_count}
                  <br />
                  投稿
                </h3>
              </Col>
            </Row>
          </Card>
          <Card title="社交平台" className="margin-1">
            <Row>
              <Col span={6}>
                {" "}
                <WeiboOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <WechatOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <TaobaoCircleOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <EllipsisOutlined style={{ fontSize: 30 }} />
              </Col>
            </Row>
          </Card>
          <Card title="相册" className="margin-1">
            <Row>
              <ImageWall />
            </Row>
          </Card>
        </Col> */}
        {!isShow && (
          <Card className="margin-1">
            <Select
              style={{
                width: 120,
                margin: "0 8px",
              }}
              defaultValue="all-portfolios"
            >
              <Option value="all-portfolios">全部作品</Option>
              <Option value="pic-portfolios">图片作品</Option>
              <Option value="pic-portfolios">文章作品</Option>
            </Select>
            <div className="align-right">
              <SearchNav />
            </div>
          </Card>
        )}
        <ArticleBrief />
        {/* <Pagination
              className="margin-1"
              defaultCurrent={1}
              total={JSON.parse(localStorage.getItem("list")).count}
            /> */}
      </div>
    );
  }
}
export default withRouter(UserPage);
