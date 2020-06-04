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
