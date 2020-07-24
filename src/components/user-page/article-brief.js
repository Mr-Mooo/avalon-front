import React from "react";

import { Card, Col, Row, Avatar, Tag } from "antd";

import "antd/dist/antd.css";

import {
  CrownOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  RotateRightOutlined
} from "@ant-design/icons";

export default function ArticleBrief() {
  let list=JSON.parse(localStorage.getItem('list'))
  console.log("list==>",list)
  return (
    <Card className="margin-1">
      {list.rows.length&&list.rows.map((item,index)=>{
       return    <Row>
       <Col className="align-left">
        {item.content}
         <br />
         <Avatar
           className="margin-author-img"
           shape="square"
           size={64}
           src="../img/photo7.jpg"
         />
         <Avatar
           className="margin-author-img"
           shape="square"
           size={64}
           path="../img/photp8.jpg"
         />
         <br />
         <Row>
           <Tag>
             <RotateRightOutlined className="margin-sm" />
             {item.recommend_number}
           </Tag>
           <Tag>
             <MessageOutlined className="margin-sm" />
             {item.comment_number}
           </Tag>
           <Tag>
             <LikeOutlined className="margin-sm" />
             {item.like_number}
           </Tag>
           <Tag>
             <CrownOutlined className="margin-sm" />
             {item.collect_number}
           </Tag>
           <Tag>
             <HeartOutlined className="margin-sm" />
             收藏
           </Tag>
         </Row>
       </Col>
     </Row>


      })}
   
    </Card>
  );
}
