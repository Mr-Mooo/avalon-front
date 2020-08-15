import React from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import { contentListApi } from "../services/content";
import emitter from "../utils/events.js";

async function onchange(value) {
  emitter.emit("changeMessage", value);
}
export default function SearchNav() {
  const { Search } = Input;

  return (
    <Search
      placeholder="热搜关键词"
      onSearch={(value) => onchange(value)}
      enterButton
    />
  );
}
