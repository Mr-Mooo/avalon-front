import React from "react";

import { Button, Col, Row, Avatar, Popover, Divider, Progress, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import { logoutApi } from '../services/user';

import { Link, withRouter } from "react-router-dom";

// export default function ProfileHeader() {

  class ProfileHeader extends React.PureComponent {
    onClick = async () => {
      
      // this.props.history.push('/');
      const logoutRes = await logoutApi({});
      if (logoutRes) {
        notification.success({
          message: '登出成功',
          description: null,
          duration: 2,
        });
      }
      
      window.location.replace('http://localhost:3000/');
    }
render(){
  return (
    <Popover content={(
    <div className="author-popover">
      {" "}
      <Avatar className="margin-bt-sm" size={64} icon={<UserOutlined />} />
      <p>昵称Emily</p>
      <Divider />
      <p>等级5</p>
      <p>
        <Progress percent={30} />
      </p>
      <p>会员有效期 2021/03/07</p>
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
      <Link to="/profile" replace>
        <Button type="primary" size="small" className="margin-sm">
          个人中心
        </Button>
      </Link>
      <Link to="/user">
        <Button type="primary" size="small" className="margin-sm">
          我的收藏
        </Button>
      </Link>
      <Link to="/recharge">
        <Button size="small" type="primary" className="margin-sm">
          充值中心
        </Button>
      </Link>
        <Button size="small" type="primary" onClick={this.onClick} className="margin-sm">
          退出登录
        </Button>
    </div>
  )}>
      {" "}
      <Avatar className="margin-bt-sm" size={32} icon={<UserOutlined />} />
    </Popover>
  );
}
  }
export default withRouter(ProfileHeader);