import React, { Component } from 'react'
import user from '../user.png';
import { Navbar,ListGroup} from 'react-bootstrap';
import './css/Space.css';

function alertClicked() {
    alert('Features is not yet developed');
  }

class Space extends Component {
      
    render() {
        return (
        <div id="main">
            <div className="Space">
                <Navbar className="spa_title">
                    <Navbar.Brand>
                        <img src={user} className="spa_photo"/>{' '}
                        Your Space
                    </Navbar.Brand>
                </Navbar>

                <ListGroup>
                    <ListGroup.Item action href="#/home" active>
                        Recruit talent
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={alertClicked}>
                        Apply for work
                    </ListGroup.Item>                    
                </ListGroup>
                
            </div>
        </div>
        );
    }
}
export default Space;