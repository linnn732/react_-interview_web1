import React, { Component } from "react";
import './css/Sendurl.css';
import { Row,Col } from 'react-bootstrap';
import arrow_back from '../arrow-back.png';
import arrow_yes from '../yes.png';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Interviewee from './Interviewee';
import Main from './Main';
import emailjs from 'emailjs-com';


class Sendurl extends Component {

    constructor(props){
        super(props);
        this.sendEmail = this.sendEmail.bind(this);
        this.state={
            EmailListTemp:JSON.parse(localStorage.getItem("EmailListTemp")),
            Name:JSON.parse(localStorage.getItem("Name")),
            NameListTemp:[]
        }
    }

    goback() {
        ReactDOM.render(
            <Interviewee />, document.getElementById('Main')
        );
    }

    sendEmail(){
        const templateParams = {
            to_email: this.state.EmailListTemp,
            subject:this.state.Name,
            html:"Welcome",
        };

        emailjs.send('service_ah92r48','template_ocnjxj8',templateParams,'user_hYjXQsUA1Z1sZeJBNMyH5')
        .then(()=>{
            console.log('OK');
        },(error)=>{
            console.log('Failed...',error);
        });

        //要建立一個button到首頁
        // let NameListTemp = JSON.parse(localStorage.getItem("Name"));//this.state.EmailListTemp;
        // if(NameListTemp == null){
        //     NameListTemp = []
        // }
        // name = this.state.Name
        // localStorage.setItem("NameListTemp",JSON.stringify(NameListTemp))
        // let ElementListTemp = []
        // for(var name of NameListTemp){
        //     ElementListTemp.push(<button variant="light" id={`${this.state.Name}`}>{this.state.Name}</button>)
        // }

        ReactDOM.render(
            <Main />, document.getElementById('Main')
        );
    }
    
    render(){
    
        return (
            <div id="Interviewee" style={{"width":"100%"}}>
                <div style={{"height":"50px"}}></div>
                <div className="sendurl_title">
                    --------   Sure to build   --------
                </div>
                <div style={{ "height": "20px" }}></div>
                <div className="check_background">
                    <Row>
                        <Col sm={7} className="dataTitle"  style={{"padding":"12px 10px 0px 50px"}}>
                            Interview name：
                        </Col>
                        <Col sm={5} className="data"  style={{"padding":"15px 50px 10px 0px"}}>
                            {this.state.Name}
                        </Col>
                        <Col sm={8} className="dataTitle"  style={{"padding":"12px 10px 0px 50px"}}>
                            Number of interviewees：
                        </Col>
                        <Col sm={4} className="data"  style={{"padding":"15px 50px 10px 0px"}}>
                            {this.state.EmailListTemp.length}
                        </Col>
                    </Row>
                </div>
                <div className="url_background">
                    <p className="urlTitle" style={{"padding":"15px 0px"}}>Send interview URL?</p>
                    <Button variant="light" className="back" onClick={this.goback}><img src={arrow_back} className="arrow_back"/>Back</Button>{' '}
                    <Button variant="light" className="yes" onClick={this.sendEmail}>Yes<img src={arrow_yes} className="arrow_yes"/></Button>{' '}
                </div>
            </div>
        );
        }
    }
    export default Sendurl;