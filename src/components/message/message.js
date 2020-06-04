import React from "react";

import { Card, Col, Row, Tabs } from "antd";
import "antd/dist/antd.css";

import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  CrownOutlined
} from "@ant-design/icons";

import Hotcontent from "../hotcontent";
import Toptopic from "../toptopic";
import Commentdetial from "./comments";
import Author from "../author";

function callback(key) {
  console.log(key);
}

const { TabPane } = Tabs;

export default function Messagetab() {
  return (
    <div className="mainwidth">
      <Row>
        <Col span={18}>
          <Tabs
            defaultActiveKey="1"
            className="margin-1 home-tab"
            onChange={callback}
          >
            <TabPane
              tab={
                <span>
                  <MessageOutlined /> 评论
                </span>
              }
              key="1"
            >
              <Card className="margin-1">
                <Commentdetial />
              </Card>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <LikeOutlined /> 点赞
                </span>
              }
              key="2"
            >
              <Card className="margin-1">
                <Commentdetial />
              </Card>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <StarOutlined /> 超赞
                </span>
              }
              key="3"
            >
              <Card className="margin-1">
                <Commentdetial />
              </Card>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CrownOutlined /> 推荐
                </span>
              }
              key="4"
            >
              <Card className="margin-1">
                <Author />
              </Card>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={6}>
          {" "}
          <Hotcontent />
          <Toptopic />
        </Col>
      </Row>
    </div>
  );
}
