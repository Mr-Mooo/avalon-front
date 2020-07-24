import React from "react";

import { Col, Row } from "antd";
import "antd/dist/antd.css";

import Hotcontent from "../hotcontent";
import Toptopic from "../toptopic";
import AllTopTopics from "../all-top-topics/all-top-topics";

import Author from "../author";

export default function TopCenter() {
  return (
    <div className="mainwidth">
      <Row>
        <Col span={18}>
          <AllTopTopics />
          <Author />

          <Author />
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
