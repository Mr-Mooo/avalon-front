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

import ArticleBrief from "./article-brief";

const { Option } = Select;

class UserPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // export default function UserPage() {

  render() {
    let isShow =
      this.props.location.state && this.props.location.state.name === "my";
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
            <Divider />
            {!isShow && (
              <div>
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
        <Row>
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
          <Col span={32}>
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
            <ArticleBrief />
            <Pagination
              className="margin-1"
              defaultCurrent={1}
              total={JSON.parse(localStorage.getItem("list")).count}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(UserPage);
