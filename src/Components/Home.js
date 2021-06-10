import React, { Component} from "react";
import { Row,Col,Tab } from 'react-bootstrap';
import Top from './Top.js';
import Space from './Space.js';
import Main from './Main.js';
import './css/Home.css';

export class Home extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="Top">
                <Row>
                <Col style={{"padding":"0px 0px"}}><Top/></Col>
                </Row>
                <Tab.Container id="list">
                        <Row>
                            <Col sm={3} className="Space_frame" style={{"padding":"0px 0px"}}>
                                <Space/>
                            </Col>
                            <Col sm={9} className="Main_frame" id="Main">
                                <div style={{"height":"50px"}}></div>
                                <Main/>
                            </Col>
                        </Row>
                </Tab.Container>
            </div>
            
        );
    }
}
export default Home;