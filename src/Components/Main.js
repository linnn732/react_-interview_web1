import ReactDOM from 'react-dom';
import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Build from './Build';
import { withRouter, Link } from "react-router-dom"

import './css/Main.css';
import Cookies from 'js-cookie';

class Main extends Component {

    constructor(props) {
        super(props);
        this.pleaselogin = this.pleaselogin.bind(this);
        this.checktoken = this.checktoken.bind(this);
        this.state = {
            MyToken: Cookies.get('MyToken')
        }
    }
    componentDidMount() {
        this.checktoken()
        this.timerId = setInterval(this.checktoken, 30000); //30秒檢查一次
    }

    checktoken() {
        this.setState({
            MyToken: Cookies.get('MyToken')
        })

        let cookie_token = this.state.MyToken
        console.log(cookie_token)
        console.log(typeof(cookie_token))

        if (cookie_token == null || undefined) {
            console.log("fail")
            clearInterval(this.timerId)
            this.pleaselogin()
        }else{
            var data = { "Token": cookie_token, "Device": "Web" }

            console.log("To do check !!!")
            const fetch = require("node-fetch");
            global.Headers = fetch.Headers;
            fetch('http://localhost:3000/checktoken', {
                method: "POST",
                'body': JSON.stringify(data),
                //body: data, // data can be `string` or {object}!
                //'json': data,
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(res => res.text())
                .then(data => {
                    data = JSON.parse(data);
                    console.log(data.body)

                    var status = data.body

                    if (status == "Error") {
                        console.log("不能繼續用")
                        clearInterval(this.timerId)
                        this.pleaselogin()
                    } else if (status == "Success") {
                        console.log("可以繼續用")
                    }
                })
                .catch(e => {
                    console.log(e);
                    //發生錯誤時要做的事情
                })
        }
    }

    pleaselogin() {
        alert('請重新登入');
        
        this.props.history.push({
            pathname: "/",
        })
    }

    gotobuild() {
        ReactDOM.render(
            <Build />, document.getElementById('Main')
        );
    }
    render() {

        return (
            <div className="build">
                <div className="main_title">
                    --------   The interview you build   --------
                </div>
                <div className="the_interview_build" id="the_interview_build" ></div>
                <Button onClick={this.gotobuild} variant="danger" className="btn_build">Build</Button>
            </div>

        );

    }
}
export default withRouter(Main);