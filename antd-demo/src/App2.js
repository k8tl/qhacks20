import React from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import './App.css';
import { Row, Col } from 'antd';
import { useState, useEffect } from 'react';

const test = function(event) {
  var char = event.which || event.keyCode;
  if (char === 13) {
    console.log("f!")
  }
}

const App = () => (
  <div className="App">
    <div className="gutter-example">
    <img src={require("./logo.png")} width="142" height="142"/>
    <Row>
        <Col className="gutter-row" span={4}>
        </Col>
        <Col className="gutter-row" span={6}>
        </Col>
        <Col className="gutter-row" span={4}>
          <p id='prompt'>What launages do you want to speak?</p>
        </Col>
        <Col className="gutter-row" span={2}>
        </Col>
        <Col className="gutter-row" span={4}>
        </Col>
        <Col className="gutter-row" span={4}>
        </Col>
      </Row>
    <Row>
        <Col className="gutter-row" span={4}>
        </Col>
        <Col className="gutter-row" span={6}>
        </Col>
        <Col className="gutter-row" span={4}>
          <Input size="large" onKeyDown={test} placeholder="Age" />
        </Col>
        <Col className="gutter-row" span={2}>
        </Col>
        <Col className="gutter-row" span={4}>
        </Col>
        <Col className="gutter-row" span={4}>
        </Col>
      </Row>
      <Row>
        <Col className="gutter-row" span={8}>
        </Col>
        <Col className="gutter-row" span={8}>
          <Button type="primary" onClick={() => { console.log("OK!") }}>Button</Button>
        </Col>
        <Col className="gutter-row" span={8}>
        </Col>
    </Row>
    <Row>
        <Col className="gutter-row" span={8}>
        </Col>
        <Col className="gutter-row" span={8}>
          <Button id="hand" onClick={() => { console.log("OK!") }}>Give me a hand 👋</Button>
        </Col>
        <Col className="gutter-row" span={8}>
        </Col>
    </Row>
  </div>
</div>
  
);
export default App;

