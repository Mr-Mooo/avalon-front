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

const QuestionForm = (func) => {
  const onFinish = values => {
    console.log(values);
  };
  const props = func.props;
  console.log(props, 'this.ques props')
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
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

      <Button style={{ marginLeft: 8 }} onClick={() => props.prev()}>
        上一步
      </Button>
      <Button type="primary" onClick={() => props.next()}>
        下一步
      </Button>
    </Form>
  );
};

export default function Step2(props) {
  console.log(props, 'this.step2 props')
  return (
    <Card title="答题验证">
      <QuestionForm props={props} />
    </Card>
  );
}
