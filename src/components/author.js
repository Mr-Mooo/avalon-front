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

export default function Author(props) {
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
  const { contentData } = props;
  console.log(contentData,
    'contentData ...')
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
          <br /> {contentData && contentData.avl_user && contentData.avl_user.nick_name}
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
          {contentData && contentData.subject}
          <br />
          {contentData && contentData.avl_attachments &&
            contentData.avl_attachments.map((val) => {
              console.log(val, 'val.path')
              return (
                <Avatar
                  key={val.document_id}
                  className="margin-author-img"
                  shape="square"
                  size={64}
                  src={val.path}
                />
              );
            })
          }
          {/* <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            src="../img/photo7.jpg"
          />
          <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            src="../img/photp8.jpg"
          /> */}
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
