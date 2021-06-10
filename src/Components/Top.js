import React, { Component } from 'react'
// or less ideally
import { Navbar} from 'react-bootstrap';
import interview2 from '../interview2.png';
import GoogleLogout from 'react-google-login';
import './css/Top.css';


// import Button from 'react-bootstrap/Button';
export class Top extends Component {
    render() {
        return (
            <>
            <Navbar bg="dark" variant="dark" style={{"width":"100%","font-weight":"800"}}>
                <Navbar.Brand style={{"margin-right":"1100px"}}>
                <img
                    alt=""
                    src={interview2}
                    width="30"
                    height="30"
                    className="top_logo"
                />{' '}
                InterView Web
                </Navbar.Brand>
                <GoogleLogout
                buttonText="Logout" 
                //onLogoutSuccess={logout}
                >
                </GoogleLogout>
            </Navbar>
            </>
            
        );
    }
}
export default Top;
