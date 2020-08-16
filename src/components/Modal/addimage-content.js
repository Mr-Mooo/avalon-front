import React from "react";

import "antd/dist/antd.css";
import "../../index.css";
import {
  Upload,
  Modal,
  Input,
  Tag,
  Radio,
  notification,
  message,
  Form,
} from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";
import { uploadImg, addContentApi } from "../../services/content.js";
import emitter from "../../utils/events.js";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const { CheckableTag } = Tag;

const tagsDataAge = ["全年龄", "限制内容"];

class HotTagsAge extends React.Component {
  state = {
    selectedTags: ["全年龄"],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>标签一:</span>
        {tagsDataAge.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </>
    );
  }
}

const tagsDataLegal = ["原创", "二创"];

class HotTagsLegal extends React.Component {
  state = {
    selectedTags: ["原创"],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>标签二:</span>
        {tagsDataLegal.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </>
    );
  }
}

const tagsDataType = ["BL", "BG", "GL", "无取向"];

class HotTagsType extends React.Component {
  state = {
    selectedTags: ["BL"],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>标签三:</span>
        {tagsDataType.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </>
    );
  }
}

const tagsDataNonMandatory = ["标签一", "标签二", "标签三", "标签四"];

class HotTagsNonMandatory extends React.Component {
  state = {
    selectedTags: ["标签一"],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>标签:</span>
        {tagsDataNonMandatory.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </>
    );
  }
}

const { TextArea } = Input;

class Permission extends React.Component {
  state = {
    value: 1,
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>仅粉丝可见</Radio>
        <Radio value={2}>全部可见</Radio>
        <Radio value={3}>仅自己可见</Radio>
      </Radio.Group>
    );
  }
}

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
    };
  }
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
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
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
    console.log(tags);
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
    });
    this.formRef.current.resetFields();
    this.props.onCancel();
  };
  handleSubmit = async () => {
    const { imgUrl, tags, message } = this.state;
    try {
      await this.formRef.current.validateFields();
    } catch (err) {
      console.log(err);
      return;
    }
    // if (message === "") {
    //   // message.error("请填写图文配文内容");
    //   return;
    // }
    console.log(11111);
    const options = {
      subject: "测试",
      brief_introduction: "测试",
      type: "pictrue",
      attachment: imgUrl,
      tag: tags,
      content: message,
    };
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
    }
  };
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
          <h4>图片配文</h4>
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
              rules={[{ required: true, message: "内容不能为空" }]}
            >
              <TextArea rows={4} onChange={(e) => this.getMessage(e)} />
            </FormItem>
          </Form>
          <br />
          <br />
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
          {/* <PicturesWall /> */}
          <h4>添加标签</h4>
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
              <Tag onClick={this.showInput} className="site-tag-plus">
                <PlusOutlined /> 添加标签
              </Tag>
            )}
          </div>
          {/* <HotTagsAge /> <br />
      <br />
      <HotTagsLegal />
      <br />
      <br />
      <HotTagsType />
      <br />
      <br />
      <h4>非必选标签</h4>
      <HotTagsNonMandatory />
      <h4>权限设置</h4>
      <Permission /> */}
        </div>
      </Modal>
    );
  }
}
export default withRouter(AddImageContent);
