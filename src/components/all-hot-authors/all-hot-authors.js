import React from "react";

import { Col, Row, Avatar, Button, Divider, Card, Pagination } from "antd";
import "antd/dist/antd.css";

import {
  UserOutlined,
  SmileOutlined,
  RotateRightOutlined
} from "@ant-design/icons";

export default function AllHotAuthors() {
  return (
    <div className="mainwidth">
      <Card className="margin-1">
        <Row>
          <Col className="align-center" span={4}>
            <Avatar
              className="margin-bt-sm"
              size={64}
              icon={<UserOutlined />}
            />
            <br /> 作者昵称 <br />
            <br />
            <Button type="primary" className="gap" size="small">
              <SmileOutlined /> 关注
            </Button>
            <Button type="primary" size="small">
              <RotateRightOutlined /> 分享
            </Button>
          </Col>
          <Col span={20} className="align-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar sic
            tempor. Sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc
            accuan eget.
            <br />
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
          </Col>
        </Row>
      </Card>

      <Card className="margin-1">
        <Row>
          <Col className="align-center" span={4}>
            <Avatar
              className="margin-bt-sm"
              size={64}
              icon={<UserOutlined />}
            />
            <br /> 作者昵称 <br />
            <br />
            <Button type="primary" className="gap" size="small">
              <SmileOutlined /> 关注
            </Button>
            <Button type="primary" size="small">
              <RotateRightOutlined /> 分享
            </Button>
          </Col>
          <Col span={20} className="align-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar sic
            tempor. Sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc
            accuan eget.
            <br />
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
          </Col>
        </Row>
      </Card>

      <Card className="margin-1">
        <Row>
          <Col className="align-center" span={4}>
            <Avatar
              className="margin-bt-sm"
              size={64}
              icon={<UserOutlined />}
            />
            <br /> 作者昵称 <br />
            <br />
            <Button type="primary" className="gap" size="small">
              <SmileOutlined /> 关注
            </Button>
            <Button type="primary" size="small">
              <RotateRightOutlined /> 分享
            </Button>
          </Col>
          <Col span={20} className="align-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar sic
            tempor. Sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc
            accuan eget.
            <br />
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
          </Col>
        </Row>
      </Card>
      <Pagination className="margin-1" defaultCurrent={1} total={50} />
    </div>
  );
}
