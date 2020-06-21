import React from "react";

import "antd/dist/antd.css";
import { Form, Card, Radio, Row, Button } from "antd";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class Step2 extends React.PureComponent {
  onFinish = async() => {
    // console.log(values);
    console.log(234567);
    const fieldsValue = await this.formRef.current.validateFields();
    console.log(fieldsValue);
    console.log(11111111);
    const options = fieldsValue;
    
    // sessionStorage.setItem('options', options);
    // this.props.next()
  };

  
  formRef = React.createRef();
  render() {
    
    console.log(this.props)
    return (
    
      <Card title="答题验证">
      <Form {...layout} name="nest-messages" ref={this.formRef} onFinish={this.onFinish}>
        <Form.Item
          name={["user", "question1"]}
          rules={[
            {
              required: true
            }
          ]}
        >
          二哈和他的白猫师尊的CP？
          <Row>
            <Radio.Group name="question1" defaultValue={1}>
              <Radio value={1}>墨燃, ‎楚晚宁</Radio>
              <Radio value={2}>墨燃, 师昧</Radio>
            </Radio.Group>
          </Row>
        </Form.Item>
  
        <Form.Item
          name={["user", "question2"]}
          rules={[
            {
              required: true
            }
          ]}
        >
          二哈和他的白猫师尊的CP？
          <Row>
            <Radio.Group name="question1" defaultValue={1}>
              <Radio value={1}>墨燃, ‎楚晚宁</Radio>
              <Radio value={2}>墨燃, 师昧</Radio>
            </Radio.Group>
          </Row>
        </Form.Item>
  
        <Form.Item
          name={["user", "question3"]}
          rules={[
            {
              required: true
            }
          ]}
        >
          二哈和他的白猫师尊的CP？
          <Row>
            <Radio.Group name="question1" defaultValue={1}>
              <Radio value={1}>墨燃, ‎楚晚宁</Radio>
              <Radio value={2}>墨燃, 师昧</Radio>
            </Radio.Group>
          </Row>
        </Form.Item>
  
        <Form.Item
          name={["user", "question4"]}
          rules={[
            {
              required: true
            }
          ]}
        >
          二哈和他的白猫师尊的CP？
          <Row>
            <Radio.Group name="question1" defaultValue={1}>
              <Radio value={1}>墨燃, ‎楚晚宁</Radio>
              <Radio value={2}>墨燃, 师昧</Radio>
            </Radio.Group>
          </Row>
        </Form.Item>
  
        <Button style={{ marginLeft: 8 }} onClick={() => this.props.prev()}>
          上一步
        </Button>
        <Button type="primary" onClick={this.onFinish}>
          下一步
        </Button>
      </Form>
      </Card>
    );
  }
}
// const QuestionForm = (func) => {
//   const onFinish = values => {
//     console.log(values);
//     console.log(234567);
//   };
//   const props = func.props;
//   console.log(props, 'this.ques props')

// };

// export default function Step2(props) {
//   console.log(props, 'this.step2 props')
//   // console.log(JSON.parse(sessionStorage.getItem('options')))
//   return (
//     {/* <Card title="答题验证">
//       <QuestionForm props={props} />
//     </Card> */}
//   );
// }


export default Step2;
