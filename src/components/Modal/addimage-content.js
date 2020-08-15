import React from "react";

import "antd/dist/antd.css";
import "../../index.css";
import { Upload, Modal, Input, Tag, Radio } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { uploadImg } from "../../services/content.js";
import { config, myFetch } from "../../utils";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    uploadOptions: {},
    fileList: [
      // {
      //   uid: "-1",
      //   name: "image.png",
      //   status: "done",
      //   url:
      //     "../img/photo3.jpg"
      // },
      // {
      //   uid: "-2",
      //   name: "image.png",
      //   status: "done",
      //   url:
      //     "../img/photo4.jpg"
      // },
      // {
      //   uid: "-3",
      //   name: "image.png",
      //   status: "done",
      //   url:
      //     "../img/photo5.jpg"
      // },
      // {
      //   uid: "-4",
      //   name: "image.png",
      //   status: "done",
      //   path:
      //     "../img/photo6.jpg"
      // },
      // {
      //   uid: "-5",
      //   name: "image.png",
      //   status: "error"
      // }
    ],
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
  handleChange = async ({ file, fileList }) => {
    console.log(file, fileList, "12");
    const query = {
      file_name: file.name,
      category: "content",
      suffix: this.getFileSuffix(file.name),
    };
    const res = await uploadImg(query);
    if (res) {
      const needOption = {
        key: res.data.key,
        contentType: res.data["content-type"],
        policy: res.data.policy,
        signature: res.data.signature,
        accessKeyId: res.data.accessKeyId,
        file: file,
      };
      const res2 = await myFetch(`${res.data.request_url}`, needOption, "POST");
      console.log(res2, "1212");
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
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
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
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
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
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

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <div className="margin-1">
        <h4>图片配文</h4>
        <TextArea rows={4} />
        <br />
        <br />
        <h4>上传图片</h4>
        <p>
          *图片上传格式为png、jpg、jpeg格式，单张图片不超过20M，最多可上传9张图片
        </p>
        <PicturesWall />
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
    );
  }
}
export default withRouter(AddImageContent);
