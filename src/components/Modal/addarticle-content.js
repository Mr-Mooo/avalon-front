
import React, { PureComponent, Fragment } from 'react';

import "antd/dist/antd.css";
import "../../index.css";
import { Form, Modal, Input, Select, Checkbox, message, notification } from "antd";
import FormItem from 'antd/lib/form/FormItem';
import { addContentApi } from '../../services/content';

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
  };
 handleChange(value) {
  console.log(`selected ${value}`);
}
 onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

onCancel = e =>{

  this.setState({
    visible: false
  });
}
// handleSubmit(e) {
//   console.log(`checked = ${e.target.checked}`);
// }
handleSubmit = async (e) => {
  const fieldsValue = await this.formRef.current.validateFields();
  console.log(fieldsValue);
  // return
  message.loading('Loading...', 20, () => {
    message.destroy();
  });
  const options = {
    subject: fieldsValue.subject,
    content: fieldsValue.content,
    brief_introduction: fieldsValue.brief_introduction,
    pid: 0,
    type: "message",
    tag_ids:[],
  }
  if(fieldsValue.tag1) {
    options.tag_ids.push(Number(fieldsValue.tag1));
  }
  if(fieldsValue.tag2) {
    options.tag_ids.push(Number(fieldsValue.tag2));
  }
  if(fieldsValue.tag3) {
    options.tag_ids.push(Number(fieldsValue.tag3));
  }
  const addRes = await addContentApi(options);
  message.destroy();
  this.formRef.current.resetFields();
  if (addRes) {
    this.onCancel()
    notification.success({
      message: '发布成功',
      description: null,
      duration: 2,
    });
  }
}


onCancel=() => {
  
  this.formRef.current.resetFields();
  this.props.onCancel();
}
formRef = React.createRef();
  render() {
    const { visible, type, onOk, onCancel, message, options } = this.props;
    
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
      <Form className="mb-16"  
        ref={this.formRef} className="margin-1" hideRequiredMark>
        <h4>文章简介</h4>
        <FormItem
          name="subject"
          rules={[{ required: true, message: ' ' }]}>
        <Input placeholder="适当标题可增加阅读意向（16字内）" />
        </FormItem>
        {/* <h4>文章简介</h4>
        <FormItem
          name="brief_introduction"
          rules={[{ required: true, message: ' ' }]}>
        <Input placeholder="简介文章内容（32字内）" />
        </FormItem> */}
        <br />
        <h4>正文</h4>
        <FormItem
          name="content"
          rules={[{ required: true, message: ' ' }]}>
        <TextArea rows={8} />
        </FormItem>
        <h4>内容限制</h4>
        
        <FormItem
          name="tag1"
          initialValue="1">
        <Select
          defaultValue="1"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="1">全年龄</Option>
          <Option value="2">限制内容</Option>
        </Select>
        </FormItem>
  
        <h4>创作属性</h4>
        <FormItem
          name="tag2"
          initialValue="3">
        <Select
        defaultValue="3"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="3">原创</Option>
          <Option value="4">二创</Option>
        </Select>
        </FormItem>
  
        <h4>取向类型</h4>
        
        <FormItem
          name="tag3"
          initialValue="8">
        <Select
        defaultValue="8"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="5">BL</Option>
          <Option value="6">BG</Option>
          <Option value="7">GL</Option>
          <Option value="8">无取向</Option>
        </Select>
        </FormItem>
  
        <h4>类型</h4>
        <Checkbox onChange={this.onChange}>CP</Checkbox>
        <Input placeholder="请输入原作名" />
      </Form>
      </Modal>
    ); 
  }
}
export default AddArticleContent;

