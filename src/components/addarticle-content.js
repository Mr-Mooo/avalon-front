import React from "react";

import "antd/dist/antd.css";
import "../index.css";
import { Input, Select, Checkbox } from "antd";

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
const { TextArea } = Input;
export default function AddArticleContent() {
  return (
    <div className="margin-1">
      <h4>文章标题</h4>
      <Input placeholder="适当标题可增加阅读意向（16字内）" />
      <h4>文章简介</h4>
      <Input placeholder="简介文章内容（32字内）" />
      <br />
      <br />
      <h4>正文</h4>
      <TextArea rows={8} />
      <h4>内容限制</h4>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="jack">全年龄</Option>
        <Option value="lucy">限制内容</Option>
      </Select>

      <h4>版权</h4>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="jack">原创</Option>
        <Option value="lucy">二创</Option>
      </Select>

      <h4>类型</h4>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="jack">BL</Option>
        <Option value="lucy">BG</Option>
        <Option value="jack">GL</Option>
        <Option value="lucy">无取向</Option>
      </Select>

      <h4>类型</h4>
      <Checkbox onChange={onChange}>CP</Checkbox>
      <Input placeholder="请输入原作名" />
    </div>
  );
}
