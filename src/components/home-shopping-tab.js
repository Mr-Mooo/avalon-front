import React from "react";

import { Card } from "antd";

import "antd/dist/antd.css";
import "../index.css";
import { ShopOutlined } from "@ant-design/icons";
import guang from "../img/guanggao.png";

export default function HomeShoppingTab() {
  return (
    <Card
      hoverable
      cover={<img alt="积分商城" src={guang} />}
      className="margin-1 align-center"
    >
      <ShopOutlined size={128} /> 推荐广告位
    </Card>
  );
}
