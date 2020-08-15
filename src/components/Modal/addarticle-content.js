import React, { PureComponent, Fragment } from "react";

import "antd/dist/antd.css";
import "../../index.css";
import {
  Form,
  Modal,
  Input,
  Select,
  Checkbox,
  message,
  notification,
  Tag,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { addContentApi } from "../../services/content";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const { TextArea } = Input;

// const dataForm = form.getFieldsValue();
class AddArticleContent extends PureComponent {
  state = {
    // warranteeTable: [],
    // bankActive: 'ccb',
    // bankList: [], //银行列表
    visible: true,
    // modalVisble: false,
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

  handleChange(value) {
    console.log(`selected ${value}`);
  }
  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  onCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  // handleSubmit(e) {
  //   console.log(`checked = ${e.target.checked}`);
  // }
  handleSubmit = async (e) => {
    const fieldsValue = await this.formRef.current.validateFields();
    console.log(fieldsValue);
    // return
    message.loading("Loading...", 20, () => {
      message.destroy();
    });
    const { tags } = this.state;
    const tag_id = [];
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
      subject: fieldsValue.subject,
      content: fieldsValue.content,
      brief_introduction: fieldsValue.brief_introduction,
      pid: 0,
      type: "message",
      tag: [...tag_id, ...tags],
    };
    const addRes = await addContentApi(options);
    console.log(addRes, "123");
    message.destroy();
    this.formRef.current.resetFields();
    if (addRes) {
      this.onCancel();
      notification.success({
        message: "发布成功",
        description: null,
        duration: 2,
      });
    }
  };

  onCancel = () => {
    this.formRef.current.resetFields();
    this.props.onCancel();
  };
  formRef = React.createRef();
  render() {
    const { visible, type, onOk, onCancel, message, options } = this.props;

    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
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
        <Form
          className="mb-16"
          ref={this.formRef}
          className="margin-1"
          hideRequiredMark
        >
          <h4>标题</h4>
          <FormItem name="subject" rules={[{ required: false, message: " " }]}>
            <Input placeholder="适当标题可增加阅读意向（16字内）" />
          </FormItem>
          <h4>文章简介</h4>
          <FormItem
            name="brief_introduction"
            rules={[{ required: false, message: " " }]}
          >
            <Input placeholder="简介文章内容（32字内）" />
          </FormItem>
          <br />
          <h4>正文</h4>
          <FormItem name="content" rules={[{ required: false, message: " " }]}>
            <TextArea rows={8} />
          </FormItem>
          <h4>内容限制</h4>

          <FormItem name="tag1" initialValue="全年龄">
            <Select
              defaultValue="全年龄"
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value="全年龄">全年龄</Option>
              <Option value="限制内容">限制内容</Option>
            </Select>
          </FormItem>

          <h4>创作属性</h4>
          <FormItem name="tag2" initialValue="原创">
            <Select
              defaultValue="原创"
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value="原创">原创</Option>
              <Option value="二创">二创</Option>
            </Select>
          </FormItem>

          <h4>取向类型</h4>

          <FormItem name="tag3" initialValue="无取向">
            <Select
              defaultValue="无取向"
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value="BL">BL</Option>
              <Option value="BG">BG</Option>
              <Option value="GL">GL</Option>
              <Option value="无取向">无取向</Option>
            </Select>
          </FormItem>
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
          {/*   
        <h4>类型</h4>
        <Checkbox onChange={this.onChange}>CP</Checkbox>
        <Input placeholder="请输入原作名" /> */}
        </Form>
      </Modal>
    );
  }
}
export default AddArticleContent;
