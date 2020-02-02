import React from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import './App.css';
import { Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import {Upload, message} from 'antd';
import firebase from 'firebase'
import { FilePicker } from 'react-file-picker'

const firebaseConfig = {
  apiKey: "AIzaSyCayBzNF6X6bE8_g9Kyhf4q80-ozc_5NsY",
  authDomain: "qhacks2020-86c07.firebaseapp.com",
  databaseURL: "https://qhacks2020-86c07.firebaseio.com",
  projectId: "qhacks2020-86c07",
  storageBucket: "qhacks2020-86c07.appspot.com",
  messagingSenderId: "473899647572",
  appId: "1:473899647572:web:b6d829465789dc24d6a3c1",
  measurementId: "G-QPJ2GHS968"
};
firebase.initializeApp(firebaseConfig);

class Process extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Welcome, how old are you?",
      placeholder: "Age",
      placeholder2: "Second language",
      showfirst: true,
      showsecond: false,
      showanalysis: false,
      showstart: false,
      showlogo: true,
      bigtext: false,
      vocab:'',
      same:'',
      diff:'',
      ipa:'',
      en:'',

      username: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('en');
    const item = {
      Cupful: "pf"
    }
    itemsRef.push(item);
    this.setState({
    });
  }

  upload(f) {
    const fn = f.name;
    const storageRef = firebase.storage().ref('/images' + fn);
    const uploadTask = storageRef.put(f);
  }

  getList() {
    const same_ref = firebase.database().ref('same');
    const get_same = (i) => {
      for (let ii in i) {
        return i[ii].same_en_gr;
      }
    }

    const diff_ref = firebase.database().ref('diff');
    const get_diff = (i) => {
      for (let ii in i) {
        return i[ii].diff_en_gr;
      }
    }

    same_ref.on('value', (snapshot) => {
      const same = get_same(snapshot.val())
      localStorage.setItem("temp_same", same);   
    });

    diff_ref.on('value', (snapshot) => {
      const diff = get_diff(snapshot.val())
      localStorage.setItem("temp_diff", diff);   
    });

    var temp_same = localStorage.getItem("temp_same");
    var temp_diff = localStorage.getItem("temp_diff");
    const temp = 'Shared Sounds' + '\n' + temp_same + '\n\n' + 'Unique Sounds' + '\n' + temp_diff
    this.setState({
      text: temp,
      showstart: true
    });
  }

  getVocab_gr() {
    const gr_ref = firebase.database().ref('gr');
    const get_gr = (i) => {
      for (let ii in i) {
        return i[ii].Pfeffer;
      }
    }

    gr_ref.on('value', (snapshot) => {
      const gr = get_gr(snapshot.val())
      localStorage.setItem("temp_gr", gr);   
    });

    var temp_gr = localStorage.getItem("temp_gr");
    const temp = temp_gr
    this.setState({
      ipa: temp,
      vocab: 'Pfeffer'
    });
  }

  getVocab_en() {
    const en_ref = firebase.database().ref('en');
    const get_en = (i) => {
      for (let ii in i) {
        return i[ii].pf;
      }
    }

    en_ref.on('value', (snapshot) => {
      const en = get_en(snapshot.val())
      localStorage.setItem("temp_en", en);   
    });
    
    var temp_en = localStorage.getItem("temp_en");
    const temp = temp_en
    this.setState({
      en: 'Cupful'
    });
  }

  next1 = (event) => {
    var char = event.which || event.keyCode;
    if (char === 13) {
      this.setState({ text: "What languages do you want to speak?" });
      this.setState({ placeholder: "Native language"})
      this.setState({ showsecond: true})
    }
  };
  next2 = (event) => {
    var char = event.which || event.keyCode;
    if (char === 13) {
      this.setState({ showfirst: false})
      this.setState({ showsecond: false})
      this.getList()
    }
  };
  startlearning = (event) => {
    this.setState({ showfirst: false})
    this.setState({ showsecond: false})
    this.setState({ showstart: false})
    this.setState({ showlogo: false})
    this.setState({ bigtext: true})
    this.getVocab_gr()
    this.getVocab_en()
    this.setState({ text: ' '})
  }

  render() {
    const { showfirst } = this.state;
    const { showsecond } = this.state;
    const { showanalysis } = this.state;
    const { showstart } = this.state;
    const { showlogo } = this.state;
    const { bigtext } = this.state;
    const { vocab } = this.state;


    return (
      <div className="gutter-example">
        {showlogo && (
          <img class='center' src={require("./logo.png")} width="142" height="142"/>
        )}
        {!showlogo && (
          <img class='center' id='uplogo' src={require("./logo.png")} width="142" height="142"/>
        )}
        {bigtext && (
          <div class="tooltip">
            <p id='vocab'>{this.state.vocab}</p>
            <span class="tooltiptext">{this.state.en + " , " + this.state.ipa}</span>
          </div>
        )}
        <Row>
          <Col className="gutter-row" span={4}>
          </Col>
          <Col className="gutter-row" span={6}>
          </Col>
          <Col className="gutter-row" span={4}>
            <pre>{this.state.text}</pre>
            {showanalysis && (
              <p>{this.same}</p>
            )}
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
            {showfirst && (
              <Input size="large" onKeyDown={this.next1} placeholder={this.state.placeholder}/>
            )}
          </Col>
          <Col className="gutter-row" span={2}>
          </Col>
          <Col className="gutter-row" span={4}>
          </Col>
          <Col className="gutter-row" span={4}>
          </Col>
        </Row><Row>
          <Col className="gutter-row" span={4}>
          </Col>
          <Col className="gutter-row" span={6}>
          </Col>
          <Col className="gutter-row" span={4}>
            {showsecond && (
              <Input size="large" onKeyDown={this.next2} placeholder={this.state.placeholder2}/>
            )}
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
            {showstart && (
              <Button type="primary" id="start" class="center" onClick={this.startlearning}>Start Learning</Button>
            )}
          </Col>
          <Col className="gutter-row" span={8}>
          </Col>
        </Row><Row>
          <Col className="gutter-row" span={8}>
          </Col>
          <Col className="gutter-row" span={8}>
          </Col>
          <Col className="gutter-row" span={8}>
          </Col>
        </Row>
        <Upload {...props}>
          <Button>
            <Button id="hand" onClick={this.handleSubmit}>Give me a hand 👋</Button>
          </Button>
        </Upload>
        <div>
      </div>
      </div>
    );
  }
}

const props = {
  name: 'file',
  action: '',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

ReactDOM.render(<Process />, document.getElementById("root"));
export default Process;

