import React from "react";

import { Card, Col, Row, Avatar, Tag, Popover, Divider, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import {
  CrownOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  RotateRightOutlined,
  MailOutlined,
  SmileOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Author() {
  const content = (
    <div className="author-popover">
      {" "}
      <Avatar className="margin-bt-sm" size={64} icon={<UserOutlined />} />
      <p>作者昵称</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
        bibendum laoreet.
      </p>
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
      <Button type="primary" size="small" className="margin-sm">
        <SmileOutlined />
        关注
      </Button>
      <Button size="small" className="margin-sm">
        <MailOutlined /> 私信
      </Button>
      <Link to="/user">
        <Button size="small" className="margin-sm">
          <MailOutlined /> 查看主页
        </Button>
      </Link>
    </div>
  );
  return (
    <Card className="margin-1">
      <Row>
        <Col className="align-center" xs={12} sm={12} md={4} lg={4}>
          <Popover content={content}>
            {" "}
            <Avatar
              className="margin-bt-sm"
              size={64}
              icon={<UserOutlined />}
            />
          </Popover>
          <br /> 作者昵称
          <div className="icons-list">
            <HeartOutlined className="margin-sm" />
            <HeartOutlined className="margin-sm" />
            <HeartOutlined className="margin-sm" />
          </div>
          <Button type="primary" size="small">
            <SmileOutlined /> 关注
          </Button>
        </Col>
        <Col span={20} className="align-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
          mollis orci, sed rhoncus pronin sapien nunc accuan eget.
          <br />
          <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            src="https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          />
          <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2149&q=80"
          />
          <br />
          <Row>
            <Tag>
              <RotateRightOutlined className="margin-sm" />
              3,049
            </Tag>
            <Tag>
              <MessageOutlined className="margin-sm" />
              249
            </Tag>
            <Tag>
              <LikeOutlined className="margin-sm" />
              2,149
            </Tag>
            <Tag>
              <CrownOutlined className="margin-sm" />
              149
            </Tag>
            <Tag>
              <HeartOutlined className="margin-sm" />
              收藏
            </Tag>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
