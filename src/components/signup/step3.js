import React from "react";

import "antd/dist/antd.css";
import { Button, Card } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Step3() {
  return (
    <Card className="align-center">
      <CheckCircleOutlined style={{ fontSize: 30 }} />
      <h1>注册成功</h1>
      <Link to="/">
        <Button type="primary">确定并登陆</Button>
      </Link>
    </Card>
  );
}
