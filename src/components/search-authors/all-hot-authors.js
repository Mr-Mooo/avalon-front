import React from "react";

import { Col, Row, Avatar, Button, Divider, Card, Pagination } from "antd";
import "antd/dist/antd.css";

import {
  UserOutlined,
  SmileOutlined,
  RotateRightOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { withRouter, Link } from "react-router-dom";
class SearchAuthors extends React.PureComponent {
  render() {
    console.log("父级:", this.props);
    const { contentData } = this.props;
    return (
      <div className="mainwidth">
        <Row>
          <Col className="align-center" span={6}>
            <Avatar
              className="margin-bt-sm"
              size={64}
              icon={<UserOutlined />}
            />
            <br /> {contentData.nick_name} <br />
            <br />
            <div style={{ display: "flex" }}>
              <Button type="primary" className="gap" size="small">
                <SmileOutlined /> 关注
              </Button>
              <Link
                to={{
                  pathname: "/user-home",
                  state: {
                    id: contentData.user_id,
                    name: "user-home",
                    user: contentData,
                  },
                }}
              >
                <Button size="small">
                  <MailOutlined /> 查看主页
                </Button>
              </Link>
            </div>
          </Col>
          <Col span={18} className="align-left">
            {contentData.introduce
              ? contentData.introduce
              : "这是一段默认的简介"}
            <br />
            <Divider />
            <Row className="align-center">
              <Col span={8}>
                {" "}
                <h3>关注 {contentData.follow_count}</h3>
              </Col>

              <Col span={8}>
                <h3>粉丝 {contentData.be_follow_count}</h3>
              </Col>
              <Col span={8}>
                <h3>投稿 {contentData.content_count}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(SearchAuthors);
