import React from "react";
import {Row, Col } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import photo2 from "../img/photo2.jpeg";
import photo1 from "../img/photo1.jpeg";

export default function Imgslider() {
  return (

<Row gutter={[8, 8]}>
<Col xs={24} sm={24} md={12} lg={12}>
<img
          className="carousel-image"
          alt="img1"
          /* src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" */
          src= {photo1}
        />
          {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片...</div> */}

</Col>

<Col xs={24} sm={24} md={12} lg={12}>
<Row gutter={[8, 8]}>
<Col xs={12} sm={12} md={12} lg={12}>
<img
          className="carousel-image"
          alt="img1"
          /* src="https://images.unsplash.com/photo-1590604963420-b8085dca6a75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80" */
          src= {photo2}
       />  
        {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片...</div> */}

</Col>

<Col xs={12} sm={12} md={12} lg={12}>
<img
          className="carousel-image"
          alt="img1"
          /* src="https://images.unsplash.com/photo-1590632876315-46166b963f48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" */
          src= {photo2}
        />
         {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片...</div> */}
</Col>
</Row>

<Row gutter={[8, 8]}>
<Col xs={12} sm={12} md={12} lg={12}>
<img
          className="carousel-image"
          alt="img1"
          /* src="https://images.unsplash.com/photo-1590457226842-da02b74c5ff8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" */
          src= {photo2}
        />
         {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片...</div> */}
</Col>

<Col xs={12} sm={12} md={12} lg={12}>
<img
          className="carousel-image"
          alt="img1"
          /* src="https://images.unsplash.com/photo-1525230071276-4a87f42f469e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" */
          src= {photo2}
        />
         {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片...</div> */}
</Col>
</Row>

</Col>

</Row>

  );
}
