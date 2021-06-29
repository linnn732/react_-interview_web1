
import '../App.css';
import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import logo from '../interview2.png';
import Cookies from 'js-cookie';

class Login extends Component {

    constructor(props){
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.state = {
            MyToken: Cookies.get('MyToken')
        }
    }
    
    responseGoogle = (response) => {
        console.log(response);
        console.log("profileObj:", response.profileObj.email);
        console.log("accessToken:", response.accessToken);
        // document.cookie = 'profileObj=' + encodeURIComponent(response.profileObj.email); //email存入cookie
        // document.cookie = 'accessToken=' + encodeURIComponent(response.accessToken);    //token存入cookie

        //Login
        var data = JSON.stringify(response)

        const fetch = require("node-fetch");
        global.Headers = fetch.Headers;
        fetch('http://localhost:3000/login', {
            method: "POST",
            body: data, // data can be `string` or {object}!
            //'json': req.body,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.text())
            .then(data => {
                //將資料轉json
                data = JSON.parse(data);
                //console.log(data);
                //取得Token部分
                console.log(data.body);
                //存入Cookie
                document.cookie = 'MyToken=' + encodeURIComponent(data.body); 
                //sessionStorage.setItem('Token',data.body)
                //this.state.MyToken = {"MyToken":data.body}
                //console.log(this.state.MyToken)

                //跳轉畫面
                this.props.history.push({
                    pathname: "home",
                    state: { detail: response }
                })
            })
            .catch(e => {
                console.log(e);
                //發生錯誤時要做的事情
            })

        //     //傳email => ivw_email
        //     var data= { "email": response.profileObj.email }  
        //     const fetch = require("node-fetch");
        //     global.Headers = fetch.Headers;        
        //     fetch('http://localhost:3000/saveemail', { 
        //                method:"POST",
        //                body: JSON.stringify(data), // data can be `string` or {object}!
        //                headers: new Headers({
        //                  'Content-Type': 'application/json'
        //                })                
        //         })
        //             .then(res => res.json()) //把request json化
        //             .then(data => {


        //               //接到request data後要做的事情
        //             })
        //             .catch(e => {
        //                 console.log(e);
        //             //發生錯誤時要做的事情
        //             }) 

        //     //傳token => ivw_token
        //     var data_token= { "token": response.accessToken }  
        //    // global.Headers = fetch.Headers;        
        //     fetch('http://localhost:3000/savetoken', { 
        //                method:"POST",
        //                body: JSON.stringify(data_token), // data can be `string` or {object}!
        //                headers: new Headers({
        //                  'Content-Type': 'application/json'
        //                })                
        //         })
        //             .then(res => res.json()) //把request json化
        //             .then(data => {


        //               //接到request data後要做的事情
        //             })
        //             .catch(e => {
        //                 console.log(e);
        //             //發生錯誤時要做的事情
        //             })         
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Welcome to Interview Web
        </p>
                <div>
                    <GoogleLogin
                        clientId="115562708860-jl5q2ajou4qjsq31haes9u4lmj4onn3u.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.fail}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </header>
        );
    }
}
export default Login;

