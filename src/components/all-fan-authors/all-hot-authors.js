import React from "react";

import {
  Col,
  Row,
  Avatar,
  Button,
  Divider,
  Card,
  Pagination,
  message,
} from "antd";
import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import {
  UserOutlined,
  SmileOutlined,
  RotateRightOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  userSentimentListApi,
  fansListApi,
  guanzhu,
} from "../../services/content";
import { defaultAvatar } from "../../utils/util";
class AllFAnAuthors extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      count: "",
      page: 1,
      limit: 4,
    };
  }
  async componentDidMount() {
    this.fansList();
  }
  fansList = async () => {
    const { page } = this.state;
    const options = {
      page: page,
      limit: 5,
    };
    const res = await fansListApi(options);
    if (res) {
      this.setState({
        data: res.data.list.rows,
        count: res.data.list.count,
      });
    }
  };
  onchange = async (page, pageSize) => {
    const options = {
      page: page,
      limit: pageSize,
    };
    this.setState({
      page: page,
      limit: pageSize,
    });
    const res = await fansListApi(options);
    if (res) {
      this.setState({
        data: res.data.list.rows,
        count: res.data.list.count,
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
        this.fansList();
      } else {
        message.success("关注成功");
        this.fansList();
      }
    }
  };
  render() {
    const { data, count } = this.state;
    return (
      <div className="mainwidth">
        {data.map((item, index) => {
          return (
            <Card className="margin-1" key={index}>
              <Row>
                <Col className="align-center" span={6}>
                  <Avatar
                    className="margin-bt-sm"
                    src={
                      item.avl_user.avatar
                        ? item.avl_user.avatar
                        : defaultAvatar
                    }
                    size={64}
                    icon={<UserOutlined />}
                  />
                  <br /> {item.avl_user.nick_name} <br />
                  <br />
                  <Button
                    type="primary"
                    className="gap"
                    size="small"
                    onClick={() =>
                      this.gocollect(
                        item.avl_user.user_id,
                        item.avl_user.is_follow
                      )
                    }
                  >
                    <SmileOutlined />{" "}
                    {item.avl_user && item.avl_user.is_follow
                      ? "已关注"
                      : "关注"}
                  </Button>
                  <Link
                    to={{
                      pathname: "/user-home",
                      state: {
                        id: item.avl_user.user_id,
                        name: "user-home",
                        user: item,
                      },
                    }}
                  >
                    <Button size="small" className="margin-sm">
                      <MailOutlined /> 查看主页
                    </Button>
                  </Link>
                  {/* <Button type="primary" size="small">
                    <RotateRightOutlined /> 分享
                  </Button> */}
                </Col>
                <Col span={18} className="align-left">
                  {item.avl_user.introduce
                    ? item.avl_user.introduce
                    : "这是一段默认的介绍"}

                  <br />
                  <Divider />
                  <Row className="align-center">
                    <Col span={8}>
                      {" "}
                      <h3>关注 {item.avl_user.follow_count}</h3>
                    </Col>

                    <Col span={8}>
                      <h3>粉丝 {item.avl_user.be_follow_count}</h3>
                    </Col>
                    <Col span={8}>
                      <h3>投稿 {item.avl_user.content_count}</h3>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          );
        })}
        {count > 5 && (
          <Pagination
            className="margin-1"
            style={{ float: "right" }}
            defaultPageSize={5}
            defaultCurrent={1}
            onChange={(page, pageSize) => this.onchange(page, pageSize)}
            total={count}
          />
        )}
      </div>
    );
  }
}

export default withRouter(AllFAnAuthors);
