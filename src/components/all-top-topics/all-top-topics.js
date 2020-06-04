import React from "react";

import { Col, Row, Avatar, Button, Divider, Card } from "antd";
import "antd/dist/antd.css";

export default function AllTopTopics() {
  return (
    <div className="mainwidth">
      <Card className="margin-1">
        <Row>
          <Col className="align-center" span={4}>
            <Avatar className="margin-author-img" size={64} shape="square" />
            <br />
            <Button type="primary" size="small">
              参与话题
            </Button>
          </Col>
          <Col span={20} className="align-left">
            话题名称
            <Divider />
            <Row>
              <p className="gap">404w浏览量</p>{" "}
              <p className="gap">1.2w参与量</p>{" "}
              <p className="gap">1.3w条作品</p>
            </Row>
            <Button type="primary" className="gap" size="small">
              订阅话题
            </Button>
            <Button type="primary" className="gap" size="small">
              分享话题
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
