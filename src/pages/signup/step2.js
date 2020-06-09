import React from "react";

import "antd/dist/antd.css";
import { Form, Card, Radio, Row } from "antd";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const QuestionForm = () => {
  const onFinish = values => {
    console.log(values);
  };

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
    </Form>
  );
};

export default function Step2() {
  return (
    <Card title="答题验证">
      <QuestionForm />
    </Card>
  );
}
