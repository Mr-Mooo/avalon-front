import React from "react";

import { Card, Col, Row, Avatar, Tag } from "antd";

import "antd/dist/antd.css";

import {
  CrownOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  RotateRightOutlined
} from "@ant-design/icons";

export default function ArticleBrief() {
  return (
    <Card className="margin-1">
      <Row>
        <Col className="align-left">
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
            src="../img/photo7.jpg"
          />
          <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            path="../img/photp8.jpg"
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
