import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import history from './history';

import Login from './Views/Login/login';
import LeaderShip from './Views/DashBoard/LeaderShip/leadership';
import Processor from './Views/DashBoard/Processor/processor';
import Qrd from './Views/DashBoard/QRD/qrd';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUserDetails} from './User/action-userDetails';

import UserValidation from './User/userValidation';
import Nav from './Nav';





const Home=()=>{
  return <div>Home</div>
}
const About=()=>{
  return <div>About</div>
}
const Topics=()=>{
  return <div>Topic</div>
}

class App extends Component {
  constructor(props){
    super(props);
  }
  handleLoginSubmit=(userId,passWord)=>{
    console.log("login submited",userId,passWord);
    this.props.getUserDetails(userId,passWord);
    console.log('check1111',this.props);
  }
  render() {
    console.log('saga rendering app',this.props.userDetails);
    return (
      <div className="App">
      <BrowserRouter history={history}>
       <Switch>
         <Route exact path="/" component={()=><UserValidation userData={this.props.userDetails}/>} />
         <Route path="/login" component={()=>
           <Login handleLoginSubmit={this.handleLoginSubmit}
            userData={this.props.userDetails}
          />} />
         <Route path="/leadership" component={LeaderShip} />
         <Route path="/processor" component={Processor} />
         <Route path="/qrd" component={Qrd} />
       </Switch>
       </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state 111',state);
    return {
        userDetails: state.userDetails
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({getUserDetails: getUserDetails}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
