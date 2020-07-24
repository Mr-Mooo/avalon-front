import React from "react";

import { Card } from "antd";

import "antd/dist/antd.css";
import "../index.css";
import { ShopOutlined } from "@ant-design/icons";

export default function HomeShoppingTab() {
  return (
    <Card
      hoverable
      cover={
        <img
          alt="积分商城"
          src="https://images.unsplash.com/photo-1519563552094-a0f48181d523?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        />
      }
      className="margin-1 align-center"
    >
      <ShopOutlined size={128} /> 推荐广告位
    </Card>
  );
}
