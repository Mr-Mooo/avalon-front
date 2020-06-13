
import React, { PureComponent, Fragment } from 'react';

import "antd/dist/antd.css";
import "../../index.css";
import { Form, Modal, Input, Select, Checkbox } from "antd";
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;

const { TextArea } = Input;

  // const dataForm = form.getFieldsValue();
class AddArticleContent extends PureComponent {
  constructor() {
    super();
  }
 handleChange(value) {
  console.log(`selected ${value}`);
}
 onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
// handleSubmit(e) {
//   console.log(`checked = ${e.target.checked}`);
// }
handleSubmit = async (e) => {
  console.log('weqeqeqeqeqeq');
  console.log(this.props);
  // const fieldsValue = await this.props.form.validateFields();
  // //fieldsValue即为表单内的值
  // console.log("okHandle -> fieldsValue", fieldsValue)
  
};

  render() {
    const { visible, type, onOk, onCancel, message, options } = this.props;
    
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Modal
        visible={visible}
          cancelText="取消"
          okText="提交"
          title="投稿"
          style={{ minWidth: 483 }}
        onOk={this.handleSubmit}
        
          >
      <Form className="mb-16"  className="margin-1" hideRequiredMark>
        <h4>文章标题</h4>
        <FormItem
          name="title"
        >
        <Input placeholder="适当标题可增加阅读意向（16字内）" />
        </FormItem>
        <h4>文章简介</h4>
        <FormItem
          name="content"
        >
        <Input placeholder="简介文章内容（32字内）" />
        </FormItem>
        <br />
        <br />
        <h4>正文</h4>
        <FormItem
          name="content1"
        >
        <TextArea rows={8} />
        </FormItem>
        <h4>内容限制</h4>
        
        <FormItem
          name="content2"
        >
        <Select
          initialValue="all"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="all">全年龄</Option>
          <Option value="limit">限制内容</Option>
        </Select>
        </FormItem>
  
        <h4>版权</h4>
        <FormItem
          name="content3"
        >
        <Select
          initialValue="first"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="first">原创</Option>
          <Option value="second">二创</Option>
        </Select>
        </FormItem>
  
        <h4>类型</h4>
        
        <FormItem
          name="content4"
        >
        <Select
          initialValue="none"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="bl">BL</Option>
          <Option value="bg">BG</Option>
          <Option value="gl">GL</Option>
          <Option value="none">无取向</Option>
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
// export default Form.create()(AddArticleContent);

