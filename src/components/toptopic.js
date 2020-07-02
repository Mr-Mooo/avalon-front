import React from "react";

import { Card, Col, Row, Tabs, Button } from "antd";
import { FileOutlined, FileTextOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import { ThunderboltOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Toptopic() {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <Card className="margin-1">
      <ThunderboltOutlined /> 话题榜单 Top5
      <Link to="/all-top-topics" replace>
        <Button className="gap" type="link">
          <FileTextOutlined /> 查看全部
        </Button>
      </Link>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="作品名称" key="1">
          <Row>
            <Col span={7}>1. XXXXXX</Col>
            <Col span={3}>
              <FileOutlined className="margin-l-sm" />
            </Col>
            <Col span={11}>353w浏览 35w参与</Col>
          </Row>

          <Row>
            <Col span={7}>1. XXXXXX</Col>
            <Col span={3}>
              <FileOutlined className="margin-l-sm" />
            </Col>
            <Col span={11}>353w浏览 35w参与</Col>
          </Row>
          <Row>
            <Col span={7}>1. XXXXXX</Col>
            <Col span={3}>
              <FileOutlined className="margin-l-sm" />
            </Col>
            <Col span={11}>353w浏览 35w参与</Col>
          </Row>
          <Row>
            <Col span={7}>1. XXXXXX</Col>
            <Col span={3}>
              <FileOutlined className="margin-l-sm" />
            </Col>
            <Col span={11}>353w浏览 35w参与</Col>
          </Row>
        </TabPane>
        <TabPane tab="#Tag" key="2">
          <Row>
            <Col span={7}>1. XXXXXX</Col>
            <Col span={3}>
              <FileOutlined className="margin-l-sm" />
            </Col>
            <Col span={11}>353w浏览 35w参与</Col>
          </Row>
          <Row>
            <Col span={7}>1. XXXXXX</Col>
            <Col span={3}>
              <FileOutlined className="margin-l-sm" />
            </Col>
            <Col span={11}>353w浏览 35w参与</Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  );
}
