import React from "react";

import { Button, Col, Row, Avatar, Popover, Divider, Progress } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";

import { Link } from "react-router-dom";

export default function ProfileHeader() {
  const profilepop = (
    <div className="author-popover">
      {" "}
      <Avatar className="margin-bt-sm" size={64} icon={<UserOutlined />} />
      <p>昵称Emily</p>
      <Divider />
      <p>等级5</p>
      <p>
        <Progress percent={30} />
      </p>
      <p>会员有效期 2021/03/07</p>
      <Divider />
      <Row className="align-center">
        <Col span={8}>
          {" "}
          <h3>关注 102</h3>
        </Col>

        <Col span={8}>
          <h3>粉丝 326</h3>
        </Col>
        <Col span={8}>
          <h3>投稿 35</h3>
        </Col>
      </Row>
      <Link to="/profile" replace>
        <Button type="primary" size="small" className="margin-sm">
          个人中心
        </Button>
      </Link>
      <Link to="/user">
        <Button type="primary" size="small" className="margin-sm">
          我的收藏
        </Button>
      </Link>
      <Link to="/recharge">
        <Button size="small" type="primary" className="margin-sm">
          充值中心
        </Button>
      </Link>
      <Link to="/login" replace>
        <Button size="small" type="primary" className="margin-sm">
          退出登录
        </Button>
      </Link>
    </div>
  );

  return (
    <Popover content={profilepop}>
      {" "}
      <Avatar className="margin-bt-sm" size={32} icon={<UserOutlined />} />
    </Popover>
  );
}
