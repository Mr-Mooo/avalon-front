import React from "react";
// eslint-disable-next-line jsx-a11y/anchor-is-valid
import {
  Dropdown,
  Menu,
  List,
  Col,
  Row,
  Avatar,
  Tag,
  Popover,
  Divider,
  Button,
  message,
  Modal,
  Comment,
  Form,
  Select,
  Input,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import {
  Dianzan,
  guanzhu,
  gotuijian,
  gogetComment,
  goComment,
  gopinbi,
  gotousu,
  chaozan,
  collectionApi,
  deteleContentlApi,
} from "../services/content";
import {
  CrownOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  RotateRightOutlined,
  MailOutlined,
  SmileOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { defaultAvatar } from "../utils/util";
import AddImageContent from "./Modal/addimage-content";
import emitter from "../utils/events.js";
import grey from "../img/avalon(grey).png";
import golden from "../img/avalon(golden).png";
import Viewer from "react-viewer";
import RcViewer from "@hanyk/rc-viewer";
const { Option } = Select;
const { TextArea, Search } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        新增评论
      </Button>
    </Form.Item>
  </div>
);
class Author extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      commentList: [],
      replayData: [],
      comments: [],
      submitting: false,
      value: "",
      optionss: {},
      visible1: false,
      visible2: false,
      value2: "",
      type: 1,
      value1: "",
      content_id: "",
      contentId: "",
      userId: "",
      openId: "",
      maskId: "",
      tousu_id: "",
      replyId: "",
      id: "",
      isShowReplay: "",
      isShowAvatar: true,
      defaultValue: "",
      visible: false,
      visible3: false,
      contentData: this.props.contentData,
      imgIndex: 0,
    };
  }
  componentWillMount() {
    const { state } = this.props.location;
    if (state && (state.name === "person" || state.name === "user-home")) {
      this.setState({
        isShowAvatar: false,
      });
    }
  }
  componentDidUpdate() {
    const { state } = this.props.location;
    if (state && (state.name === "person" || state.name === "user-home")) {
      this.setState({
        isShowAvatar: false,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { state } = this.props.location;
    if (state && (state.name === "person" || state.name === "user-home")) {
      this.setState({
        isShowAvatar: false,
      });
    }
    this.setState((prevState) => {
      delete prevState.contentData;
      return prevState;
    });
    this.setState((state, props) => ({ contentData: props.contentData }));
  }
  goDianzan = async (id, isLike) => {
    let options = {
      content_id: id,
      is_delete: isLike ? 1 : 0,
    };
    const addRes = await Dianzan(options);
    if (addRes && addRes.success) {
      if (isLike) {
        message.success("成功取消");
        this.props.refush();
      } else {
        message.success("点赞成功");
        this.props.refush();
      }
    }
  };
  chaozan = async (id, isLike) => {
    let options = {
      content_id: id,
    };
    const addRes = await chaozan(options);
    if (addRes && addRes.success) {
      message.success("超赞成功");
      this.props.refush();
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
        this.props.refush();
      } else {
        message.success("关注成功");
        this.props.refush();
      }
    }
  };

  gogetComment = async (id) => {
    let options = {
      pid: 0,
      content_id: id,
    };

    this.setState({
      optionss: options,
    });

    const addRes = await gogetComment(options);

    if (addRes && addRes.success) {
      this.setState({ commentList: [] }, () => {
        this.setState({ commentList: addRes.data.rows });
      });
    }
    this.setState({ visible: true });
  };

  gotuijian = async (id) => {
    let options = {
      content_id: id,
      is_delete: 0,
    };
    const addRes = await gotuijian(options);
    if (addRes && addRes.success) {
      message.success("推荐成功");
      this.props.refush();
    }
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
      replyId: "",
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
      replyId: "",
    });
  };

  handleOk1 = async (content_id, type) => {
    const { contentData } = this.state;
    // 屏蔽动态
    const { value1 } = this.state;
    if (type == 1) {
      let options = {
        content_id: content_id,
      };
      if (!options.content_id) return;
      const addRes = await gopinbi(options);
      if (addRes.success) {
        message.success("您已成功屏蔽该动态");
        // this.props.refush();
        this.setState({
          id: content_id,
        });
      }
    } else {
      if (!value1) {
        message.error("文本框不能为空");
        return;
      }
      const { tousu_id } = this.state;
      let options = {
        content_id: tousu_id,
        reason: value1,
      };
      const addRes = await gotousu(options);
      if (addRes.success) {
        message.success("您已成功投诉该动态");
        this.props.refush();
      }
    }
    this.setState({
      visible1: false,
      value1: "",
    });
  };

  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
    });
  };

  handleSubmit = () => {
    const { optionss } = this.state;
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
      replyId: "",
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
      });
    }, 1000);
    optionss.content = this.state.value;
    delete optionss.pid;
    this.goComment(optionss);
  };

  goComment = async (optionss) => {
    let options = { ...optionss };
    const addRes = await goComment(options);
    if (addRes && addRes.success) {
      message.success("评论成功");
      this.gogetComment(options.content_id);
      this.props.refush();
    }
  };

  setComment = (pid, ref_id) => {};

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onChange1 = (e) => {
    this.setState({
      value1: e.target.value,
    });
  };

  handleChange1 = async (content_id, e) => {
    this.setState({ type: e });
    if (Number(e) === 2) {
      this.setState({ visible1: true, tousu_id: content_id });
    } else if (Number(e) === 1) {
      this.handleOk1(content_id, 1);
    } else if (Number(e) === 3) {
      const op = {
        content_id: content_id,
      };
      const res = await collectionApi(op);
      if (res.code === 0) {
        message.success("收藏成功");
      }
    }
  };
  goModal = (id) => {
    this.setState({ visible1: true, content_id: id });
  };
  openMask = (value, id) => {
    if (!value) {
      this.setState({ visible2: false, maskId: id });
    } else {
      this.setState({ visible2: true, value2: value, openId: id });
    }
  };
  // 关闭文章详情弹窗
  handleOk2 = () => {
    const { openId } = this.state;
    this.setState({ visible2: false, maskId: openId });
  };
  cancel2 = () => {
    this.setState({ visible2: false });
  };
  reply = (item) => {
    const { replyId } = this.state;
    if (item.comment_id === replyId) {
      this.setState({
        replyId: "",
        userId: "",
        contentId: "",
      });
    } else {
      const { comment_id, create_user, content_id } = item;
      this.setState({
        replyId: comment_id,
        userId: create_user,
        contentId: content_id,
      });
    }
  };
  // 回复评论
  getSearch = async (value, item) => {
    const { contentId, replyId, userId, isShowReplay } = this.state;
    const options = {
      content: value,
      pid: replyId,
      ref_id: userId,
      content_id: contentId,
    };
    const res = await goComment(options);
    if (res.message === "success") {
      message.success("回复成功");
      this.gogetComment(contentId);
      this.setState({
        defaultValue: "",
      });
      if (isShowReplay) {
        this.openReply(isShowReplay);
      }
    }
  };
  //获取二级评论
  openReply = async (value) => {
    const options = {
      pid: value.comment_id,
      content_id: value.content_id,
    };
    const res = await gogetComment(options);
    this.setState({
      replayData: res.data.rows,
      isShowReplay: value,
    });
  };
  //跳转到tag页面
  goTag = (item) => {
    this.props.history.push({ pathname: "/tag", state: { tag: item } });
  };
  // 获取input变化值
  getchangeValue = (e) => {
    this.setState({
      defaultValue: e.target.value,
    });
  };
  delete = async (id) => {
    const options = {
      content_id: id,
    };
    const res = await deteleContentlApi(options);
    if (res.code === 0) {
      message.success("删除成功");
      this.props.refush();
    }
  };
  operation = (data) => {
    this.setState({
      visible3: true,
    });
    emitter.emit("openmask", data);
  };
  closeMore = () => {
    this.setState({
      maskId: "",
    });
  };
  getIndex = (index) => {
    this.setState({
      imgIndex: index,
    });
  };

  render() {
    const {
      comments,
      submitting,
      value,
      commentList,
      type,
      value1,
      visible1,
      value2,
      openId,
      maskId,
      contentData,
      id,
      replyId,
      isShowAvatar,
      replayData,
      isShowReplay,
      defaultValue,
      visible3,
      imgIndex,
    } = this.state;
    // const menu = (
    //   <Menu onClick={this.handleChange1()}>
    //     <Menu.Item key="1">屏蔽动态</Menu.Item>
    //     <Menu.Item key="2">投诉动态</Menu.Item>
    //   </Menu>
    // );
    const setData =
      contentData.avl_attachments &&
      JSON.parse(JSON.stringify(contentData.avl_attachments));

    const srcData =
      setData &&
      setData.map((item) => {
        return {
          src: `https://avl-dev.obs.cn-east-2.myhuaweicloud.com/${item.path}`,
          alt: "图片",
        };
      });
    const dataContent = contentData.content.replace(/\n/g, "</br>");
    const { state } = this.props.location;
    const { user } = JSON.parse(localStorage.getItem("userInfo"));
    const options = {};

    return (
      <div style={{ width: "100%" }}>
        {!(id === contentData.content_id) && (
          <List className="listAuthor">
            <Row>
              {isShowAvatar && (
                <Col
                  className="list-user"
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  span={60}
                  style={{ textAlign: "center" }}
                >
                  <Popover
                    className="div-left"
                    content={
                      <div className="author-popover">
                        {" "}
                        <Avatar
                          className="margin-bt-sm"
                          size={50}
                          src={
                            contentData.avl_user.avatar
                              ? contentData.avl_user.avatar
                              : defaultAvatar
                          }
                          icon={<UserOutlined />}
                        />
                        <p>{contentData.avl_user.nick_name}</p>
                        <p>
                          {contentData.avl_user.introduce
                            ? contentData.avl_user.introduce
                            : "暂无数据"}
                        </p>
                        <Divider />
                        <Row className="align-center">
                          <Col span={8}>
                            {" "}
                            <h3>关注 {contentData.avl_user.follolw_number}</h3>
                          </Col>

                          <Col span={8}>
                            <h3>粉丝 {contentData.avl_user.fans_number}</h3>
                          </Col>
                          <Col span={8}>
                            <h3>投稿 {contentData.avl_user.content_number}</h3>
                          </Col>
                        </Row>
                        {user.user_id !== contentData.create_user && (
                          <Button
                            type="primary"
                            size="small"
                            className="margin-sm"
                            onClick={() =>
                              this.gocollect(
                                contentData.avl_user.user_id,
                                contentData.avl_user.is_follow
                              )
                            }
                          >
                            <SmileOutlined />
                            {contentData.avl_user.is_follow ? "已关注" : "关注"}
                          </Button>
                        )}
                        {/* <Button size="small" className="margin-sm">
                    <MailOutlined /> 私信
                  </Button> */}
                        <Link
                          to={{
                            pathname: "/user-home",
                            state: {
                              id: contentData.avl_user.user_id,
                              name: "user-home",
                              user: contentData.avl_user,
                            },
                          }}
                        >
                          <Button size="small" className="margin-sm">
                            <MailOutlined /> 查看主页
                          </Button>
                        </Link>
                      </div>
                    }
                  >
                    <Link
                          to={{
                            pathname: "/user-home",
                            state: {
                              id: contentData.avl_user.user_id,
                              name: "user-home",
                              user: contentData.avl_user,
                            },
                          }}
                        >
                    <Avatar
                      className="margin-bt-sm"
                      style={{ textAlign: "center" }}
                      size={50}
                      src={
                        contentData.avl_user.avatar
                          ? contentData.avl_user.avatar
                          : defaultAvatar
                      }
                      icon={<UserOutlined />}
                    />
                     </Link>
                  </Popover>
                  <br />
                  {contentData &&
                    contentData.avl_user &&
                    contentData.avl_user.nick_name}
                  <br />
                </Col>
              )}
              <Col span={isShowAvatar ? 20 : 24} className="align-left">
                <Row>
                  <h3>{contentData.subject}</h3>
                  {/* <DownOutlined className="icon-down" onClick={()=>this.goModal(contentData.content_id)}></DownOutlined> */}
                  {(isShowAvatar || (state && state.name === "person")) && (
                    <Dropdown
                      overlay={
                        <Menu>
                          {user.user_id !== contentData.create_user && (
                            <Menu.Item key="1">
                              <a
                                onClick={() =>
                                  this.handleChange1(contentData.content_id, 1)
                                }
                              >
                                屏蔽动态
                              </a>
                            </Menu.Item>
                          )}

                          {user.user_id !== contentData.create_user && (
                            <Menu.Item key="2">
                              <a
                                onClick={() =>
                                  this.handleChange1(contentData.content_id, 2)
                                }
                              >
                                投诉动态
                              </a>
                            </Menu.Item>
                          )}
                          {user.user_id !== contentData.create_user && (
                            <Menu.Item key="3">
                              {this.props.location.pathname === "/user" ? (
                                <a>取消收藏</a>
                              ) : (
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                <a
                                  onClick={() =>
                                    this.handleChange1(
                                      contentData.content_id,
                                      3
                                    )
                                  }
                                >
                                  收藏
                                </a>
                              )}
                            </Menu.Item>
                          )}
                          {/* {user.user_id === contentData.create_user && (
                            <Menu.Item key="4">
                              <a onClick={() => this.operation(contentData)}>
                                编辑
                              </a>
                            </Menu.Item>
                          )} */}
                          {user.user_id === contentData.create_user && (
                            <Menu.Item key="5">
                              <a
                                onClick={() =>
                                  this.delete(contentData.content_id)
                                }
                              >
                                删除
                              </a>
                            </Menu.Item>
                          )}
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <DownOutlined className="icon-down" />
                    </Dropdown>
                  )}
                </Row>
                {dataContent && (
                  <div
                    className={
                      maskId === contentData.content_id ? "" : "showThree"
                    }
                    dangerouslySetInnerHTML={{
                      __html: dataContent,
                    }}
                  >
                    {/* {contentData && contentData.content} */}
                  </div>
                )}
                {!(maskId === contentData.content_id) &&
                  contentData &&
                  contentData.content.length > 130 && (
                    <div
                      className="more"
                      onClick={() =>
                        this.openMask(
                          contentData.brief_introduction,
                          contentData.content_id
                        )
                      }
                    >
                      查看更多
                    </div>
                  )}
                {maskId === contentData.content_id &&
                  contentData &&
                  contentData.content.length > 130 && (
                    <div
                      className="more"
                      onClick={() =>
                        this.closeMore(
                          contentData.brief_introduction,
                          contentData.content_id
                        )
                      }
                    >
                      收起更多
                    </div>
                  )}
                <div
                  className={
                    contentData.avl_attachments.length === 4
                      ? "imgListFour"
                      : "imgList"
                  }
                >
                  <RcViewer options={options} ref="viewer">
                    {contentData &&
                      contentData.avl_attachments &&
                      contentData.avl_attachments.map((val, index) => {
                        return (
                          // <Zmage
                          //   className="margin-author-img"
                          //   src={`https://avl-dev.obs.cn-east-2.myhuaweicloud.com/${val.path}`}
                          //   set={srcData}
                          //   onClick={() => this.getIndex(index)}
                          //   style={{ width: 100, height: 100 }}
                          //   defaultPage={imgIndex}
                          //   key={val.document_id}
                          //   hideOnScroll={false}
                          //   edge={50}
                          //   preset="desktop"
                          //   backdrop="rgba(0,0,0,0.5)"
                          // />
                          <img
                            className="margin-author-img"
                            style={{ width: 100, height: 100 }}
                            src={`https://avl-dev.obs.cn-east-2.myhuaweicloud.com/${val.path}`}
                          />
                        );
                      })}
                  </RcViewer>
                </div>
                <br />
                <div>
                  {contentData.tag &&
                    contentData.tag.map((item, index) => {
                      return (
                        <Tag
                          key={index}
                          onClick={() => this.goTag(item)}
                          style={{
                            border: "1px solid #2db7f5",
                            cursor: "pointer",
                          }}
                        >
                          {item}
                        </Tag>
                      );
                    })}
                </div>
                {/* <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            src="../img/photo7.jpg"
          />
          <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            src="../img/photp8.jpg"
          /> */}
                <br />
                {/* <Row className="buttom-click"> */}
                <Row>
                  <Col span={6}>
                    <div
                      className="iconShow"
                      onClick={() => this.gotuijian(contentData.content_id)}
                    >
                      推荐
                      <RotateRightOutlined
                        className="margin-sm"
                        style={{
                          color: contentData.is_recommend ? "#1890ff" : "",
                        }}
                      />
                      {contentData.recommend_number}
                    </div>
                  </Col>
                  <Col span={6}>
                    <div
                      className="iconShow"
                      onClick={() => this.gogetComment(contentData.content_id)}
                    >
                      评论
                      <MessageOutlined className="margin-sm" />
                      {contentData.comment_number}
                    </div>
                  </Col>
                  <Col span={6}>
                    <div
                      className="iconShow"
                      onClick={() =>
                        this.goDianzan(
                          contentData.content_id,
                          contentData.is_like
                        )
                      }
                    >
                      点赞
                      <LikeOutlined
                        className="margin-sm"
                        style={{ color: contentData.is_like ? "#1890ff" : "" }}
                      />
                      {contentData.like_number}
                    </div>
                  </Col>
                  <Col span={6}>
                    <div
                      className="iconShow"
                      onClick={() => this.chaozan(contentData.content_id)}
                    >
                      超赞
                      {contentData.is_collected ? (
                        <img
                          src={golden}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "5px",
                            marginRight: "5px",
                            verticalAlign: "top",
                            marginTop: "3px",
                          }}
                        />
                      ) : (
                        <img
                          src={grey}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "5px",
                            marginRight: "5px",
                            verticalAlign: "top",
                            marginTop: "3px",
                          }}
                        />
                      )}
                      {contentData.collect_number}
                    </div>
                  </Col>
                </Row>

                {/* 收藏 */}

                {/* <Tag>
                <HeartOutlined className="margin-sm" />
              收藏
            </Tag> */}
              </Col>
            </Row>
            <Modal
              title="评论列表"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              cancelText="取消"
              width="550px"
              okText="确定"
              footer={null}
            >
              <div
                style={{
                  maxHeight: 800,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={commentList}
                  renderItem={(item) => {
                    return (
                      <div>
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                src={
                                  item["avl_user.avatar"]
                                    ? item["avl_user.avatar"]
                                    : defaultAvatar
                                }
                                icon={<UserOutlined />}
                              />
                            }
                            title={ <Link
                              to={{
                                pathname: "/user-home",
                                state: {
                                  id: item.create_user,
                                  name: "user-home",
                                },
                              }}
                            >{item.create_user_name}</Link>}
                            description={item.content}
                            onClick={() =>
                              this.setComment(item.pid, item.ref_id)
                            }
                          />
                        </List.Item>
                        <div
                          className="replay"
                          onClick={() => this.reply(item)}
                        >
                          回复
                        </div>
                        {replyId === item.comment_id && (
                          <div
                            style={{
                              width: 420,
                              marginLeft: 50,
                              marginBottom: 10,
                            }}
                          >
                            <Search
                              placeholder="请输入回复内容"
                              enterButton="评论"
                              size="small"
                              onChange={(e) => this.getchangeValue(e)}
                              value={defaultValue}
                              onSearch={(value) => this.getSearch(value)}
                            />
                          </div>
                        )}
                        {item.count > 0 && (
                          <div style={{ marginLeft: 50 }}>
                            <span
                              style={{
                                color: "#1890ff",
                                cursor: "pointer",
                                marginLeft: 5,
                              }}
                              onClick={() => this.openReply(item)}
                            >
                              共{item.count}条回复
                            </span>
                          </div>
                        )}
                        <div>
                          {isShowReplay.comment_id === item.comment_id &&
                            replayData.map((ele) => {
                              return (
                                <div
                                  style={{ marginLeft: 50 }}
                                  key={ele.comment_id}
                                >
                                  <span
                                    style={{
                                      color: "#1890ff",
                                      marginRight: 5,
                                    }}
                                  >
                                    {ele.create_user_name
                                      ? ele.create_user_name
                                      : "名称"}
                                  </span>
                                  <span>{ele.content}</span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  }}
                />
                <Comment
                  // avatar={
                  //   <Avatar
                  //     src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  //     alt="Han Solo"
                  //   />
                  // }
                  content={
                    <Editor
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  }
                />
              </div>
            </Modal>

            <Modal
              title="动态处理"
              visible={this.state.visible1}
              cancelText="取消"
              okText="确定"
              onOk={this.handleOk1}
              onCancel={this.handleCancel1}
            >
              {type == 1 ? null : (
                <div>
                  <TextArea
                    rows={4}
                    onChange={this.onChange1}
                    value={value1}
                    style={{ marginTop: "20px" }}
                  />
                </div>
              )}
            </Modal>
            <Modal
              title="阅前须知"
              visible={this.state.visible2}
              cancelText="取消"
              okText="确定"
              onOk={this.handleOk2}
              onCancel={this.cancel2}
            >
              <div className="detail">{value2}</div>
            </Modal>
          </List>
        )}
        <AddImageContent
          title="文章投稿"
          visible={visible3}
          onCancel={() => {
            this.setState({
              visible3: false,
            });
          }}
        />
      </div>
    );
  }
}

export default withRouter(Author);
