import React from "react";

import "antd/dist/antd.css";
import "../index.css";
import { Layout, Row, Col, Grid } from "antd";
import Imgslider from "./imgslider";

import Hotcontent from "./hotcontent";
import Toptopic from "./toptopic";
import HomeTab from "./home-tab";
import HomeShoppingTab from "./home-shopping-tab";

const { Content } = Layout;

// const { useBreakpoint } = Grid;

export default function MainContent() {
  return (
    <Layout>
      <Content className="mainwidth">
       
 <Imgslider />
        <Row>
          <Col xs={24} sm={24} md={18} lg={18}>
            <HomeTab />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            {" "}
            <HomeShoppingTab />
            <Hotcontent />
            <Toptopic />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
