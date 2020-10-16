import React from "react";

import "antd/dist/antd.css";
import "../../index.css";
import {
  Upload,
  Modal,
  Input,
  Tag,
  Select,
  Radio,
  notification,
  message,
  Form,
  Button,
  Checkbox,
  Row,
  Col,
} from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";
import {
  uploadImg,
  addContentApi,
  defaulttagApi,
} from "../../services/content.js";
import emitter from "../../utils/events.js";
const { Option } = Select;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const { CheckableTag } = Tag;

const { TextArea } = Input;

class AddImageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: "",
      message: "",
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      uploadOptions: {},
      needOption: {},
      imgUrl: [],
      fileList: [],
      fvisible: false,
      messageImage: "",
      tagData: [],
      checkedValue: [],
      defaultTagData: [],
    };
  }
  componentDidMount() {
    this.eventEmitter = emitter.addListener("openmask", (message) => {
      if (message) {
        if (message.avl_attachments.length > 0) {
          const image = message.avl_attachments.map((item, index) => {
            return {
              uid: index,
              url: `https://avl-dev.obs.cn-east-2.myhuaweicloud.com/${item.path}`,
              urlhttp: item.path,
            };
          });
          this.setState({
            fileList: image,
          });
        }
        this.setState({
          messageImage: message,
        });
      }
    });
    this.getDefaultData();
  }
  // componentWillUnmount() {
  //   // 卸载时移除事件
  //   emitter.removeListener(this.eventEmitter);
  // }
  getDefaultData = async () => {
    const res = await defaulttagApi();
    if (res) {
      this.setState({
        tagData: res.data,
        defaultTagData: res.data,
      });
      console.log(res, "123");
    }
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  getFileSuffix = (name) => {
    if (name) {
      const lastIndex = name.lastIndexOf(".");
      const suffix = name.slice(lastIndex + 1);
      return suffix;
    }
  };
  onRemove = (file) => {
    const { fileList, imgUrl } = this.state;
    fileList.forEach((item, index) => {
      if (item.uid === file.uid) {
        imgUrl.splice(index, 1);
        this.setState({
          imgUrl: imgUrl,
        });
      }
    });
  };
  beforeUpload = async (file, fileList) => {
    const { imgUrl } = this.state;
    const query = {
      file_name: file.name,
      category: "content",
      suffix: this.getFileSuffix(file.name),
    };
    // if(file)
    const res = await uploadImg(query);
    if (res) {
      const needOption = {
        url: res.data.request_url,
        key: res.data.key,
        contentType: res.data["content-type"],
        policy: res.data.policy,
        signature: res.data.signature,
        accessKeyId: res.data.accessKeyId,
        file: fileList,
      };
      this.setState({
        needOption: needOption,
        imgUrl: [...imgUrl, res.data.key],
      });
    }
  };
  handleChange = async ({ file, fileList }) => {
    this.setState({ fileList });
  };
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };
  getMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
  };
  //关闭弹框
  onCancel = () => {
    this.setState({
      tags: [],
      imgUrl: [],
      fileList: [],
      message: "",
      tagData: this.state.defaultTagData,
    });
    this.formRef.current.resetFields();
    this.props.onCancel();
  };
  handleSubmit = async () => {
    const {
      imgUrl,
      tags,
      message,
      messageImage,
      fileList,
      checkedValue,
    } = this.state;

    let fieldsValue = "";
    try {
      fieldsValue = await this.formRef.current.validateFields();
    } catch (err) {
      console.log(err);
      return;
    }

    // if (message === "") {
    //   // message.error("请填写图文配文内容");
    //   return;
    // }
    let tag_id = [];
    if (fieldsValue.tag1) {
      tag_id.push(fieldsValue.tag1);
    }
    if (fieldsValue.tag2) {
      tag_id.push(fieldsValue.tag2);
    }
    if (fieldsValue.tag3) {
      tag_id.push(fieldsValue.tag3);
    }
    const options = {
      subject: "分享图片",
      brief_introduction: fieldsValue.brief_introduction,
      type: "pictrue",
      attachment: imgUrl,
      tag: [...tag_id, ...tags],
      content: message ? message : "分享图片",
    };
    if (messageImage) {
    } else {
      const addRes = await addContentApi(options);
      if (addRes) {
        this.onCancel();
        notification.success({
          message: "发布成功",
          description: null,
          duration: 2,
        });
        this.setState({
          tags: [],
          imgUrl: [],
          fileList: [],
          message: "",
        });

        emitter.emit("changeMessage", "");
        window.location.reload();
      }
    }
  };
  getcheckValue = (checkedValues) => {
    const { tags, checkedValue } = this.state;
    if (tags.indexOf(checkedValues) > -1) {
      return;
    }
    this.setState({
      checkedValue: [...checkedValue, checkedValues],
      tags: [...tags, checkedValues],
    });
  };
  handleClose = (e) => {
    const tags = this.state.tags.filter((tag) => tag !== e);
    const { defaultTagData } = this.state;
    const isData = defaultTagData.some((res) => {
      if (res.content !== e) {
        return false;
      } else {
        return true;
      }
    });
    if (isData) {
      this.setState({
        tagData: [...this.state.tagData, { content: e }],
      });
    }
    this.setState({
      tags: tags,
      checkedValue: tags,
    });
  };
  getButtonValue(checkedValues) {
    const { tags, tagData } = this.state;
    if (tags.indexOf(checkedValues) > -1) {
      return;
    }
    const data = [...tags, checkedValues];
    const filterTag = tagData.filter((res) => {
      return checkedValues !== res.content;
    });
    this.setState({
      tags: data,
      tagData: filterTag,
    });
  }
  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };
  formRef = React.createRef();
  render() {
    const {
      tags,
      inputVisible,
      inputValue,
      previewVisible,
      previewImage,
      fileList,
      previewTitle,
      needOption,
      messageImage,
      tagData,
      checkedValue,
    } = this.state;
    const { visible } = this.props;
    const tagChild = tags.map(this.forMap);
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Modal
        visible={visible}
        cancelText="取消"
        okText="提交"
        title="投稿"
        style={{ minWidth: 483 }}
        onOk={this.handleSubmit}
        onCancel={this.onCancel}
      >
        <div className="margin-1">
          <h4>分享图片</h4>
          <Form
            className="mb-16"
            ref={this.formRef}
            initialValues={{
              remember: true,
            }}
            className="margin-1"
            // hideRequiredMark
          >
            {" "}
            <FormItem
              name="subject"
              rules={[{ required: false, message: "内容不能为空" }]}
              initialValue={messageImage && messageImage.content}
            >
              <TextArea rows={4} onChange={(e) => this.getMessage(e)} />
            </FormItem>
            <h4>内容简介</h4>
            <FormItem
              name="brief_introduction"
              rules={[{ required: false, message: " 内容不能为空" }]}
            >
              <Input placeholder="内容简介（64字内）" />
            </FormItem>
            <h4>上传图片</h4>
            <p>
              *图片上传格式为png、jpg、jpeg格式，单张图片不超过20M，最多可上传9张图片
            </p>
            <div>
              <div className="clearfix">
                <Upload
                  action={needOption.url}
                  listType="picture-card"
                  method="POST"
                  data={{
                    key: needOption.key,
                    "content-type": needOption.contentType,
                    policy: needOption.policy,
                    signature: needOption.signature,
                    accessKeyId: needOption.accessKeyId,
                  }}
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  onRemove={this.onRemove}
                >
                  {fileList.length >= 9 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </div>
            </div>
            <h4>内容限制（*仅用于后台分类，不用于前端展示）</h4>
            <FormItem name="tag1" initialValue="全年龄">
              {messageImage ? (
                <Select style={{ width: 120 }} disabled>
                  <Option value="全年龄">全年龄</Option>
                  <Option value="限制内容">限制内容</Option>
                </Select>
              ) : (
                <Select style={{ width: 120 }}>
                  <Option value="全年龄">全年龄</Option>
                  <Option value="限制内容">限制内容</Option>
                </Select>
              )}
            </FormItem>
            <h4>取向类型（*仅用于后台分类，不用于前端展示）</h4>
            <FormItem name="tag3" initialValue="无取向">
              {messageImage ? (
                <Select style={{ width: 120 }} disabled>
                  <Option value="BL">BL</Option>
                  <Option value="BG">BG</Option>
                  <Option value="GL">GL</Option>
                  <Option value="无取向">无取向</Option>
                </Select>
              ) : (
                <Select style={{ width: 120 }}>
                  <Option value="BL">BL</Option>
                  <Option value="BG">BG</Option>
                  <Option value="GL">GL</Option>
                  <Option value="无取向">无取向</Option>
                </Select>
              )}
            </FormItem>
            <h4>创作属性</h4>
            <FormItem name="tag2" initialValue="原创">
              {messageImage ? (
                <Select style={{ width: 120 }} disabled>
                  <Option value="原创">原创</Option>
                  <Option value="二创">二创</Option>
                </Select>
              ) : (
                <Select style={{ width: 120 }}>
                  <Option value="原创">原创</Option>
                  <Option value="二创">二创</Option>
                </Select>
              )}
            </FormItem>
            <FormItem name="tag4">
              <h4>添加标签</h4>
              {!messageImage && (
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <TweenOneGroup
                      enter={{
                        scale: 0.8,
                        opacity: 0,
                        type: "from",
                        duration: 100,
                        onComplete: (e) => {
                          e.target.style = "";
                        },
                      }}
                      leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                      appear={false}
                    >
                      {tagChild}
                    </TweenOneGroup>
                  </div>
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      onClose={(e) => this.handleClose(e)}
                      className="site-tag-plus"
                    >
                      <PlusOutlined /> 添加标签
                    </Tag>
                  )}
                </div>
              )}
              <h4 style={{ marginTop: "20px" }}>推荐标签</h4>
              <Row>
                {tagData.map((item, index) => {
                  return (
                    <div key={index}>
                      {/* <Col span={8} > */}
                      {/* <Checkbox
                        value={item.content}
                        checked={checkedValue.indexOf(item.content) > -1}
                        onChange={() => this.getcheckValue(item.content)}
                      >
                        {item.content}
                      </Checkbox> */}
                      <Button
                        type="primary"
                        style={{ marginRight: "10px", marginBottom: "10px" }}
                        onClick={() => this.getButtonValue(item.content)}
                      >
                        {item.content}
                      </Button>
                      {/* </Col> */}
                    </div>
                  );
                })}
              </Row>
            </FormItem>
          </Form>

          {/* <h4>非必选标签</h4>
          <HotTagsNonMandatory />
          <h4>权限设置</h4>
          <Permission /> */}
        </div>
      </Modal>
    );
  }
}
export default withRouter(AddImageContent);
