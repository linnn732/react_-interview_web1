import './App.css';
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//import {BrowserRouter as Router,Switch,Route,Link, Redirect} from 'react-router-dom'

import Home from './Components/Home';
import Login from './Components/Login';
import Build from './Components/Build';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // render() {
  return (
    <div className="App">
      <Router>
        <Switch>
{/* 
        <Route path="/"><Login /></Route>
        <Route path="/home"><Home /></Route> */}
        
        <Route exact path="/"  component={Login} />
        <Route exact path="/home"  component={Home} />
        <Route exact path="/build"  component={Build} />

        </Switch>
      </Router>
    </div>
  );
  // }
}
export default App;