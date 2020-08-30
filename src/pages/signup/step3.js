import React from "react";

import "antd/dist/antd.css";
import { Button, Card, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index1.css";
export default function Step3() {
  return (
    <Card className="align-center cardXX">
      <CheckCircleOutlined style={{ fontSize: 30 }} />
      <h1>注册成功</h1>
      {/* <Link to="/">
        <Button type="primary">确定并登陆</Button>
      </Link>
      <br /> */}
      <Link to="/">
        <Button
          type="primary"
          style={{ marginTop: 40 }}
          onClick={() => message.success("Processing complete!")}
        >
          完成
        </Button>
      </Link>
    </Card>
  );
}
