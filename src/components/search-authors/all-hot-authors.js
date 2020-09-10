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

import {
  UserOutlined,
  SmileOutlined,
  RotateRightOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { withRouter, Link } from "react-router-dom";
import { guanzhu } from "../../services/content";
import { defaultAvatar } from "../../utils/util";
class SearchAuthors extends React.PureComponent {
  gocollect = async (id, is_recommend) => {
    let options = {
      follow_id: id,
      is_delete: is_recommend ? 1 : 0,
    };
    const addRes = await guanzhu(options);
    if (addRes && addRes.success) {
      if (is_recommend) {
        message.success("取消关注");
        this.props.refush();
      } else {
        message.success("关注成功");
        this.props.refush();
      }
    }
  };
  render() {
    console.log("父级:", this.props);
    const { contentData } = this.props;
    return (
      <div className="mainwidth">
        <Row>
          <Col className="align-center" span={6}>
            <Avatar
              className="margin-bt-sm"
              src={contentData.avatar ? contentData.avatar : defaultAvatar}
              size={64}
              icon={<UserOutlined />}
            />
            <br /> {contentData.nick_name} <br />
            <br />
            <div style={{ display: "flex" }}>
              <Button
                type="primary"
                className="gap"
                size="small"
                onClick={() =>
                  this.gocollect(contentData.user_id, contentData.is_follow)
                }
              >
                <SmileOutlined /> {contentData.is_follow ? "已关注" : "关注"}
              </Button>
              <Link
                to={{
                  pathname: "/user-home",
                  state: {
                    id: contentData.user_id,
                    name: "user-home",
                    user: contentData,
                  },
                }}
              >
                <Button size="small">
                  <MailOutlined /> 查看主页
                </Button>
              </Link>
            </div>
          </Col>
          <Col span={18} className="align-left">
            {contentData.introduce
              ? contentData.introduce
              : "这是一段默认的简介"}
            <br />
            <Divider />
            <Row className="align-center">
              <Col span={8}>
                {" "}
                <h3>关注 {contentData.follow_count}</h3>
              </Col>

              <Col span={8}>
                <h3>粉丝 {contentData.be_follow_count}</h3>
              </Col>
              <Col span={8}>
                <h3>投稿 {contentData.content_count}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(SearchAuthors);
