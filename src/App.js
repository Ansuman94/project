import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,Redirect,withRouter} from 'react-router-dom';
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

import DashBoard from './Views/DashBoard/dashBoard';

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
    let view;
    if(Object.keys(this.props.userDetails).length ===0){
      view=<Route path="/" exact component={()=>
             <Login handleLoginSubmit={this.handleLoginSubmit}
              userData={this.props.userDetails}
            />} />
    }
    else{
      view=<DashBoard userData={this.props.userDetails} />;
    }
    return (
      <div className="App">
        {view}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
