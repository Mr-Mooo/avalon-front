import React from "react";
import { Button, Col, Row, Avatar, Popover } from "antd";

import "antd/dist/antd.css";
import "../index.css";
import { ShakeOutlined } from "@ant-design/icons";

export default function TaskHeader() {
  const contenttask = (
    <div className="task-popover">
      {" "}
      <p>任务板</p>
      <Row className="task-item">
        <Col span={4}>
          {" "}
          <Avatar
            shape="square"
            className="margin-bt-sm"
            size={32}
            icon={<ShakeOutlined />}
          />
        </Col>
        <Col span={18}>
          {" "}
          <h5>任务名称 | 奖励：+EXP 200</h5>
          <p className="font-sm">任务解释，如何算任务完成标准</p>
          <Button type="primary" size="small" className="margin-sm">
            去完成
          </Button>
        </Col>
      </Row>
      <Row className="task-item">
        <Col span={4}>
          {" "}
          <Avatar
            shape="square"
            className="margin-bt-sm"
            size={32}
            icon={<ShakeOutlined />}
          />
        </Col>
        <Col span={18}>
          {" "}
          <h5>任务名称 | 奖励：+EXP 200</h5>
          <p className="font-sm">任务解释，如何算任务完成标准</p>
          <Button type="primary" size="small" className="margin-sm">
            去完成
          </Button>
        </Col>
      </Row>
    </div>
  );

  return <Popover content={contenttask}> 任务</Popover>;
}
