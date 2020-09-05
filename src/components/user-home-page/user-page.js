import React from "react";

import {
  Col,
  Row,
  Avatar,
  Button,
  Divider,
  Card,
  Pagination,
  Select,
  message,
} from "antd";
import "antd/dist/antd.css";
import {
  UserOutlined,
  SmileOutlined,
  MailOutlined,
  WeiboOutlined,
  WechatOutlined,
  EllipsisOutlined,
  TaobaoCircleOutlined,
} from "@ant-design/icons";

import ImageWall from "./image-wall";
import SearchNav from "../search";
import { Link, withRouter } from "react-router-dom";
import { homePageApi } from "../../services/content";
import ArticleBrief from "./article-brief";
import { defaultAvatar } from "../../utils/util";
import { guanzhu } from "../../services/content";
import { userApi } from "../../services/user";
const { Option } = Select;

class UserPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      is_follow: false,
      follow_count: 0,
      content_count: 0,
      be_follow_count: 0,
      user: {},
    };
  }
  componentDidMount() {
    this.getFolleowData();
    this.getUser();
  }
  componentWillReceiveProps(nextprops) {
    const { id } = nextprops.location.state;
    if (id !== this.props.location.state.id) {
      this.getFolleowData();
      this.getUser();
    }
  }
  getUser = async () => {
    const { state } = this.props.location;
    const options = {
      limit: 10,
      page: 1,
      user_id: state.id,
    };
    const res = await userApi(options);
    if (res) {
      this.setState({
        follow_count: res.user.follow_count,
        content_count: res.user.content_count,
        be_follow_count: res.user.be_follow_count,
        user: res.user,
      });
    }
  };
  getFolleowData = async () => {
    const { state } = this.props.location;
    const options = {
      limit: 10,
      page: 1,
      user_id: state.id,
    };
    const res = await homePageApi(options);
    if (res) {
      this.setState({
        is_follow: res.is_follow,
      });
    }
  };
  gocollect = async (id, is_recommend) => {
    let options = {
      follow_id: id,
      is_delete: is_recommend ? 1 : 0,
    };
    const addRes = await guanzhu(options);
    if (addRes && addRes.success) {
      if (is_recommend) {
        message.success("取消关注");
        this.getFolleowData();
      } else {
        message.success("关注成功");
        this.getFolleowData();
      }
    }
  };
  render() {
    const {
      is_follow,
      follow_count,
      content_count,
      be_follow_count,
      user,
    } = this.state;
    console.log(user, "userid");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return (
      <div className="mainwidth">
        <Card className="margin-1 align-center">
          <div className="">
            {" "}
            <Avatar
              className="margin-bt-sm"
              src={user.avatar ? user.avatar : defaultAvatar}
              size={64}
              icon={<UserOutlined />}
            />
            <p>作者昵称：{user.nick_name}</p>
            <p>{user.introduce}</p>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col span={1}>关注 {follow_count}</Col>
              <Col span={1}>粉丝 {be_follow_count}</Col>
              <Col span={1}>投稿 {content_count}</Col>
            </Row>
            {user.user_id !== userInfo.user.user_id && (
              <div>
                <Divider />
                <Button
                  type="primary"
                  size="small"
                  className="margin-sm"
                  onClick={() => this.gocollect(user.user_id, is_follow)}
                >
                  <SmileOutlined />
                  {is_follow ? "已关注" : "关注"}
                </Button>
              </div>
            )}
            {/* <Button size="small" className="margin-sm">
                  <MailOutlined /> 私信
                </Button> */}
          </div>
        </Card>
        {/* <Col span={8}>
          <Card className="margin-1">
            <Row className="align-center">
              <Col span={8}>
                {" "}
                <h3>
                {userInfo.user.follow_count}
                  <br />
                  关注
                </h3>
              </Col>

              <Col span={8}>
                <h3>
                {userInfo.user.be_follow_count}
                  <br />
                  粉丝
                </h3>
              </Col>
              <Col span={8}>
                <h3>
                {userInfo.user.content_count}
                  <br />
                  投稿
                </h3>
              </Col>
            </Row>
          </Card>
          <Card title="社交平台" className="margin-1">
            <Row>
              <Col span={6}>
                {" "}
                <WeiboOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <WechatOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <TaobaoCircleOutlined style={{ fontSize: 30 }} />
              </Col>
              <Col span={6}>
                {" "}
                <EllipsisOutlined style={{ fontSize: 30 }} />
              </Col>
            </Row>
          </Card>
          <Card title="相册" className="margin-1">
            <Row>
              <ImageWall />
            </Row>
          </Card>
        </Col> */}
        {/* {!isShow && (
          <Card className="margin-1">
            <Select
              style={{
                width: 120,
                margin: "0 8px",
              }}
              defaultValue="all-portfolios"
            >
              <Option value="all-portfolios">全部作品</Option>
              <Option value="pic-portfolios">图片作品</Option>
              <Option value="pic-portfolios">文章作品</Option>
            </Select>
            <div className="align-right">
              <SearchNav />
            </div>
          </Card>
        )} */}
        <ArticleBrief />
        {/* <Pagination
              className="margin-1"
              defaultCurrent={1}
              total={JSON.parse(localStorage.getItem("list")).count}
            /> */}
      </div>
    );
  }
}
export default withRouter(UserPage);
