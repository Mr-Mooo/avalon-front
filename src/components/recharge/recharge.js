import React from "react";

import { Col, Row, Avatar, Button, Divider, Card, Radio, Input } from "antd";
import "antd/dist/antd.css";
import {
  UserOutlined,
  TransactionOutlined,
  GiftOutlined,
  FilterOutlined,
  AccountBookOutlined
} from "@ant-design/icons";

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}

export default function Recharge() {
  return (
    <div className="mainwidth">
      <Row>
        <Col span={6}>
          <Card className="margin-1">
            <Row>
              <Col span={8}>
                {" "}
                <Avatar
                  className="margin-bt-sm"
                  size={64}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col span={8}>
                <h3>昵称</h3>
                <p>关注数： 2323 粉丝数： 232W</p>
                <p>会员有效期 2021-03-07</p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <GiftOutlined /> 30
              </Col>
              <Col span={8}>
                <FilterOutlined /> 30
              </Col>
              <Col span={8}>
                <AccountBookOutlined /> 23,029
              </Col>
            </Row>
          </Card>
          <Card title="充值" className="margin-1">
            <div>
              {" "}
              <TransactionOutlined /> 月卡充值
            </div>
            <div>
              {" "}
              <GiftOutlined /> 月卡充值
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card title="XXXX月卡超值价" className="margin-1">
            <Row className="recharge-gap">
              <span className="gap">充值类型</span>
              <span className="gap">月卡充值</span>
            </Row>
            <Row className="recharge-gap">
              <span className="gap ">充值时间</span>
              <span className="gap">
                <Radio.Group onChange={onChange} defaultValue="a">
                  <Radio.Button value="yearly">
                    年卡：￥388 每天低至xx元
                  </Radio.Button>
                  <Radio.Button value="half-yearly">
                    半年年卡：￥199 每天低至xx元
                  </Radio.Button>
                  <Radio.Button value="quarterly">
                    半年年卡：￥100 每天低至xx元
                  </Radio.Button>
                  <Radio.Button value="monthly">
                    半年年卡：￥35 每天低至xx元
                  </Radio.Button>
                </Radio.Group>
              </span>
            </Row>

            <Row className="recharge-gap">
              <span className="gap ">支付方式</span>
              <span className="gap">
                <Radio.Group onChange={onChange} defaultValue="a">
                  <Radio.Button value="yearly">微信支付</Radio.Button>
                  <Radio.Button value="half-yearly">支付宝支付</Radio.Button>
                </Radio.Group>
              </span>
            </Row>

            <Row className="recharge-gap">
              <span className="gap ">手机号码</span>
              <span className="gap">
                <Input placeholder="请输入13位手机号码" />
              </span>
            </Row>

            <Row className="recharge-gap">
              <span className="gap ">短信验证</span>
              <span className="gap">
                <Input placeholder="请输入验证码" />
                <Button type="primary">获取验证码</Button>
              </span>
            </Row>
            <Divider />
            <Row className="recharge-gap">
              <span className="gap ">支付金额</span>
              <span className="gap">￥388</span>
            </Row>
            <Button type="primary" disabled>
              确认支付
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
