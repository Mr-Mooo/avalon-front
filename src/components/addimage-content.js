import React from "react";

import "antd/dist/antd.css";
import "../index.css";
import { Upload, Modal, Input, Tag, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url:
          "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=663&q=80"
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url:
          "https://images.unsplash.com/photo-1589201968286-dfb786c4f846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80"
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url:
          "https://images.unsplash.com/photo-1588971450634-cea736e3fab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80"
      },
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url:
          "https://images.unsplash.com/photo-1588823420733-f5871965b18f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      },
      {
        uid: "-5",
        name: "image.png",
        status: "error"
      }
    ]
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

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
          {fileList.length >= 8 ? null : uploadButton}
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
    selectedTags: ["全年龄"]
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>标签一:</span>
        {tagsDataAge.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
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
    selectedTags: ["原创"]
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>标签二:</span>
        {tagsDataLegal.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
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
    selectedTags: ["BL"]
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>标签三:</span>
        {tagsDataType.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
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
    selectedTags: ["标签一"]
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <>
        <span style={{ marginRight: 8 }}>标签:</span>
        {tagsDataNonMandatory.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
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
    value: 1
  };

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
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

export default function AddImageContent() {
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
      <h4>必选标签</h4>
      <HotTagsAge /> <br />
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
      <Permission />
    </div>
  );
}
