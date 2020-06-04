import React from "react";

import {
  Col,
  Row,
  Avatar,
  Button,
  Divider,
  Card,
  Pagination,
  Select
} from "antd";
import "antd/dist/antd.css";
import {
  UserOutlined,
  SmileOutlined,
  MailOutlined,
  WeiboOutlined,
  WechatOutlined,
  EllipsisOutlined,
  TaobaoCircleOutlined
} from "@ant-design/icons";

import ImageWall from "./image-wall";
import SearchNav from "../search";

import ArticleBrief from "./article-brief";

const { Option } = Select;

export default function UserPage() {
  return (
    <div className="mainwidth">
      <Card className="margin-1 align-center">
        <div className="">
          {" "}
          <Avatar className="margin-bt-sm" size={64} icon={<UserOutlined />} />
          <p>作者昵称</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet.
          </p>
          <Divider />
          <Button type="primary" size="small" className="margin-sm">
            <SmileOutlined />
            关注
          </Button>
          <Button size="small" className="margin-sm">
            <MailOutlined /> 私信
          </Button>
        </div>
      </Card>
      <Row>
        <Col span={8}>
          <Card className="margin-1">
            <Row className="align-center">
              <Col span={8}>
                {" "}
                <h3>
                  102
                  <br />
                  关注
                </h3>
              </Col>

              <Col span={8}>
                <h3>
                  326
                  <br />
                  粉丝
                </h3>
              </Col>
              <Col span={8}>
                <h3>
                  35
                  <br />
                  投稿
                </h3>
              </Col>
            </Row>
          </Card>
          <Card title="社交平台" className="margin-1">
            <Row>
              <Col span={6}>
                {" "}
                <WeiboOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <WechatOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <TaobaoCircleOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <EllipsisOutlined style={{ fontSize: 30 }} />
              </Col>
            </Row>
          </Card>
          <Card title="相册" className="margin-1">
            <Row>
              <ImageWall />
            </Row>
          </Card>
        </Col>
        <Col span={16}>
          <Card className="margin-1">
            <Select
              style={{
                width: 120,
                margin: "0 8px"
              }}
              defaultValue="all-portfolios"
            >
              <Option value="all-portfolios">全部作品</Option>
              <Option value="pic-portfolios">图片作品</Option>
              <Option value="pic-portfolios">文章作品</Option>
            </Select>
            <div className="align-right">
              <SearchNav />
            </div>
          </Card>
          <ArticleBrief />
          <ArticleBrief />
          <Pagination className="margin-1" defaultCurrent={1} total={50} />
        </Col>
      </Row>
    </div>
  );
}
