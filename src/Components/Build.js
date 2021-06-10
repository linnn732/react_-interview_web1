import '../App.css';
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Interviewee from './Interviewee';
import Main from './Main';
import ReactDOM from 'react-dom';
import './css/Build.css';
import arrow_back from '../arrow-back.png';
import $ from 'jquery'


function alertClicked() {
    alert('Features is not yet developed');
}

class Build extends Component {

    constructor(props){
        super(props);
        this.gotointerviewee = this.gotointerviewee.bind(this);
    
        this.state={
            Name:JSON.parse(localStorage.getItem("Name"))
        }
    }

    gotointerviewee() {

        var name = $('#interview_id').val()
        this.state.Name=name
        localStorage.setItem("Name",JSON.stringify(this.state.Name)) //轉成字串

        ReactDOM.render(
            <Interviewee />, document.getElementById('Main')
        );
    }

    goback() {
        ReactDOM.render(
            <Main />, document.getElementById('Main')
        );
    }

    render() {

        return (
        <div id="Build">
            <div style={{"height":"50px"}}></div>
            <div className="build_title">
            --------   Set interview name   --------
            </div>
            <div style={{ "height": "20px" }}></div>
            <div className="setname_background">
                <div>
                    <TextField className="text_name" label="Name" id="interview_id" defaultValue={this.state.Name} style={{"margin":"20px 0px"}}/>
                </div>
            </div>
            <div style={{ "height": "20px" }}></div>
            <div className="build_title">
            --------   Choose a template   --------
            </div> 
            <div style={{ "height": "50px" }}></div>
            <div>
                <>
                    <Button onClick={this.gotointerviewee} variant="outline-primary" className="btn_standard" >標 準</Button>{' '}
                    <Button action onClick={alertClicked} variant="outline-success" className="btn_no">餐 飲</Button>{' '}
                    <Button action onClick={alertClicked} variant="outline-warning" className="btn_no">行 政</Button>{' '}<br></br><br></br>
                    <Button action onClick={alertClicked} variant="outline-danger" className="btn_no">行 銷</Button>{' '}
                    <Button action onClick={alertClicked} variant="outline-info" className="btn_no">勞 務</Button>{' '}
                    <Button action onClick={alertClicked} variant="outline-light" className="btn_no">代 理</Button>{' '}
                </>
            </div>
            <Button variant="light" className="build_back" onClick={this.goback}><img src={arrow_back} className="arrow_back"/>Back</Button>{' '}
        </div>
        );
    }
}
export default Build;