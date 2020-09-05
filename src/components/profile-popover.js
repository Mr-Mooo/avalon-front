import React from "react";

import {
  Button,
  Col,
  Row,
  Avatar,
  Popover,
  Divider,
  Progress,
  Badge,
  notification,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import { logoutApi, userApi } from "../services/user";
import {
  contentListApi,
  userMessageApi,
  readfansApi,
} from "../services/content";
import { Link, withRouter } from "react-router-dom";
import { defaultAvatar, baseUrl } from "../utils/util";
// export default function ProfileHeader() {

class ProfileHeader extends React.PureComponent {
  state = {
    data: [],
    fan: 0,
    timer: "",
  };
  componentDidMount() {
    const options = {};
    this.getContentData(options);
    this.getuser();
    setInterval(() => {
      this.getuser();
    }, 1200000);
  }
  getuser = async () => {
    const res = await userMessageApi();
    if (res) {
      this.setState({
        data: res.data,
        fan: res.data.new_fans,
      });
    }
  };
  getContentData = async (options = {}) => {
    const data1 = localStorage.getItem("userInfo");
    let user_id = data1 && JSON.parse(data1).user.user_id;
    const userRes = await userApi({ user_id: user_id });
    localStorage.setItem("userInfo", JSON.stringify(userRes));
    if (userRes) {
      console.log(userRes, "userRes");
      this.setState({
        data: userRes,
      });
    }
  };

  onClick = async () => {
    // this.props.history.push('/');
    const logoutRes = await logoutApi({});
    if (logoutRes) {
      notification.success({
        message: "登出成功",
        description: null,
        duration: 2,
      });
    }
    window.location.replace(baseUrl);
  };
  readFans = async () => {
    const res = await readfansApi();
  };
  render() {
    const { data, fan } = this.state;
    console.log("11111", data);
    return (
      <Popover
        content={
          <div className="author-popover">
            {" "}
            <Avatar
              className="margin-bt-sm"
              size={64}
              src={
                data.user && data.user.avatar ? data.user.avatar : defaultAvatar
              }
              icon={<UserOutlined />}
            />
            <p>{data.user && data.user.nick_name}</p>
            {/* <Divider /> */}
            {/* <p>等级5</p>
      <p>
        <Progress percent={30} />
      </p>
      <p>会员有效期 2021/03/07</p> */}
            <Divider />
            <Row className="align-center">
              <Col span={8}>
                {" "}
                <h3>关注 {data.user && data.user.follow_count}</h3>
              </Col>

              <Col span={8} style={{ position: "relative" }}>
                <Link
                  to={{
                    pathname: "/all-fan-authors",
                    state: { id: data.user && data.user.user_id },
                  }}
                >
                  <div onClick={() => this.readFans()}>
                    <h3>粉丝 {data.user && data.user.be_follow_count}</h3>
                    {fan > 0 && <Badge count={fan} offset={[30, -60]} />}
                  </div>
                </Link>
              </Col>
              <Col span={8}>
                <h3>投稿 {data.user && data.user.content_count}</h3>
              </Col>
            </Row>
            <Link to="/profile">
              <Button type="primary" size="small" className="margin-sm">
                个人中心
              </Button>
            </Link>
            <Link to={{ pathname: "user", state: { name: "my" } }}>
              <Button type="primary" size="small" className="margin-sm">
                我的收藏
              </Button>
            </Link>
            {/* <Link to="/recharge">
              <Button size="small" type="primary" className="margin-sm">
                充值中心
              </Button>
            </Link> */}
            <Button
              size="small"
              type="primary"
              onClick={this.onClick}
              className="margin-sm"
            >
              退出登录
            </Button>
          </div>
        }
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#fff",
            verticalAlign: "center",
            display: "inline-block",
            lineHeight: 0,
          }}
          className="avatarF"
        >
          <Avatar
            className="margin-bt-sm"
            src={
              data.user && data.user.avatar ? data.user.avatar : defaultAvatar
            }
            size={32}
            icon={<UserOutlined />}
          />
        </div>
      </Popover>
    );
  }
}
export default withRouter(ProfileHeader);
