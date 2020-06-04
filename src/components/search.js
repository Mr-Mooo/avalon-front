import React from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "../index.css";

export default function SearchNav() {
  const { Search } = Input;

  return (
    <Search placeholder="热搜关键词" onSearch={value => console.log(value)} enterButton />

  );
}
