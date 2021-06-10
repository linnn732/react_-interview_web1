import '../App.css';
import React, { Component } from "react";
import './css/Interviewee.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Build from './Build';
import arrow_back from '../arrow-back.png';
import arrow_next from '../arrow-next.png';
import Sendurl from './Sendurl';
// import Home from './Home';
import $ from 'jquery'

class Interviewee extends Component {
    constructor(props){
        super(props);
        this.join = this.join.bind(this);
        this.delete = this.delete.bind(this);
        this.email_btn_render = this.email_btn_render.bind(this);
        
        this.state={
            EmailListTemp:[],
        }
    }

    componentDidMount(){
        this.email_btn_render()    
    }

goback() {
    ReactDOM.render(
        <Build />, document.getElementById('Main')
    );
}

gonext() {
    // this.state.EmailListTemp
    ReactDOM.render(
        <Sendurl />, document.getElementById('Main')
    );
}

delete(event){
    console.log(event.target.id); //印出值
    let delete_email = event.target.id
    console.log(this.state.EmailListTemp.indexOf(delete_email))
    //let delete_email_index = this.state.EmailListTemp.indexOf(delete_email)

    this.state.EmailListTemp = this.state.EmailListTemp.filter(function(item) {
        return item != delete_email
    });
    console.log(this.state.EmailListTemp); 

    localStorage.setItem("EmailListTemp",JSON.stringify(this.state.EmailListTemp)) //轉成字串
    this.email_btn_render()
}

join() {
    var email = $('#txt_email').val()
    console.log(email); //印出值
    $('#txt_email').val(""); //清除text內容
    
    let EmailListTemp = JSON.parse(localStorage.getItem("EmailListTemp"));
    if(EmailListTemp == null){
        EmailListTemp = []
    }//不可以null
    EmailListTemp.push(email)//把emil存入陣列
    localStorage.setItem("EmailListTemp",JSON.stringify(EmailListTemp)) //轉成字串
    this.setState({"EmailListTemp":EmailListTemp},()=>{
        this.email_btn_render()
    }); //將21行的變數＝陣列
}

email_btn_render(){
    let EmailListTemp = JSON.parse(localStorage.getItem("EmailListTemp"));//this.state.EmailListTemp;
        if(EmailListTemp == null){
            EmailListTemp = []
        }
        
        localStorage.setItem("EmailListTemp",JSON.stringify(EmailListTemp))
        this.setState({"EmailListTemp":EmailListTemp});
        console.log(EmailListTemp)
        let ElementListTemp = []
        for(var email of EmailListTemp){
            ElementListTemp.push(<button variant="light" id={`${email}`} onClick={(e)=>{this.delete(e)}} className="email">{email}</button>)
        }
        
        ReactDOM.render(
            ElementListTemp, document.getElementById('set_interviewee')
        );
}

render(){

    return (
        <div id="Interviewee" style={{"width":"100%"}}>
            <div style={{"height":"50px"}}></div>
            <div className="Interviewee_title">
            --------   Set interviewee   --------
            </div>
            <div style={{ "height": "20px" }}></div>
            <div className="set_background" >
                <div>
                    <Grid container spacing={1}>
                    <Grid item style={{"padding":"10px 10px 0px 30px"}}>
                        <AccountCircle/>
                    </Grid>
                    <Grid item>
                        <TextField className="text" id="txt_email"/>
                        <Button variant="light" className="button_join" style={{"padding":"0px 0px"}} onClick={this.join}>Join</Button>
                    </Grid>
                    </Grid>
                </div>
            </div>
            <div style={{ "height": "30px" }}></div>
            <div className="set_interviewee" id="set_interviewee"></div>
            <div style={{ "height": "30px" }}></div>
            <Button variant="light" className="back" onClick={this.goback}><img src={arrow_back} className="arrow_back"/>Back</Button>{' '}
            <Button variant="light" className="next" onClick={this.gonext}>Next<img src={arrow_next} className="arrow_next"/></Button>{' '}
        </div>
    );
    }
}
export default Interviewee;