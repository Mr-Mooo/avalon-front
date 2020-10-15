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
  Row,
  Col,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { addContentApi, defaulttagApi } from "../../services/content";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import emitter from "../../utils/events.js";
const { Option } = Select;

const { TextArea } = Input;

// const dataForm = form.getFieldsValue();
class AddArticleContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // warranteeTable: [],
      // bankActive: 'ccb',
      // bankList: [], //银行列表
      visible: true,
      // modalVisble: false,
      tags: [],
      inputVisible: false,
      inputValue: "",
      tagData: [],
      checkedValue: [],
    };
  }
  componentDidMount() {
    this.getDefaultData();
  }
  getDefaultData = async () => {
    const res = await defaulttagApi();
    if (res) {
      this.setState({
        tagData: res.data,
      });
    }
  };
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
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
    const { checkedValues } = this.state;
    let fieldsValue = "";
    try {
      fieldsValue = await this.formRef.current.validateFields();
    } catch (err) {
      console.log(err);
      return;
    }
    console.log(this.props, "12");
    // message.loading("Loading...", 20, () => {
    //   message.destroy();
    // });
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
    message.destroy();
    this.formRef.current.resetFields();
    if (addRes) {
      this.onCancel();
      notification.success({
        message: "发布成功",
        description: null,
        duration: 2,
      });
      this.setState({
        tags: [],
      });
      emitter.emit("changeMessage", "");
      window.location.reload();
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
    this.setState({
      tags: tags,
      checkedValue: tags,
    });
  };
  onCancel = () => {
    this.formRef.current.resetFields();
    this.setState({
      tags: [],
    });
    this.props.onCancel();
  };
  formRef = React.createRef();
  render() {
    const { visible, type, onOk, onCancel, message, options } = this.props;

    const {
      tags,
      inputVisible,
      inputValue,
      tagData,
      checkedValue,
    } = this.state;
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
          initialValues={{
            remember: true,
          }}
          className="margin-1"
          // hideRequiredMark
        >
          <h4>标题</h4>
          <FormItem
            name="subject"
            rules={[{ required: true, message: "内容不能为空" }]}
          >
            <Input placeholder="适当标题可增加阅读意向（16字内）" />
          </FormItem>
          <h4>
            阅前须知（*用于长文章展开前的内容简介与雷点预警。若不涉及相关内容可不填写）
          </h4>
          <FormItem
            name="brief_introduction"
            rules={[{ required: false, message: " 内容不能为空" }]}
          >
            <Input placeholder="简介文章内容（64字内）" />
          </FormItem>
          <br />
          <h4>正文</h4>
          <FormItem
            name="content"
            rules={[{ required: true, message: "内容不能为空" }]}
          >
            <TextArea rows={8} />
          </FormItem>
          <h4>内容限制（*仅用于后台分类，不用于前端展示）</h4>
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
          <h4>取向类型 （*仅用于后台分类，不用于前端展示）</h4>
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
          <h4>推荐标签</h4>
          <FormItem name="tag4">
            {/* <Checkbox.Group
              style={{ width: "100%" }}
              onChange={(checkedValues) => this.getcheckValue(checkedValues)}
            > */}
            <Row>
              {tagData.map((item) => {
                return (
                  <Col span={8} key={item.tag_id}>
                    <Checkbox
                      checked={checkedValue.indexOf(item.content) > -1}
                      onChange={() => this.getcheckValue(item.content)}
                      value={item.content}
                    >
                      {item.content}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
            {/* </Checkbox.Group> */}
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
              <Tag
                onClick={this.showInput}
                onClose={(e) => this.handleClose(e)}
                className="site-tag-plus"
              >
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
