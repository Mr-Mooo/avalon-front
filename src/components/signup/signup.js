import React from "react";

import "antd/dist/antd.css";
import { Steps, Button, message, Card } from "antd";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Step = Steps.Step;

const steps = [
  {
    title: "手机验证",
    content: <Step1 />
  },
  {
    title: "验证答题",
    content: <Step2 />
  },
  {
    title: "注册成功",
    content: <Step3 />
  }
];

class ProcessSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
          <div className="steps-content">{steps[current].content}</div>
        </Steps>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              完成
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default function Signup() {
  return (
    <Card className="mainwidth">
      <ProcessSteps />
    </Card>
  );
}
