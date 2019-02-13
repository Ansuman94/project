import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import history from './history';
import PropTypes from "prop-types";

import Login from './Views/Login/login';
import Loader from './Common/Components/Loader/loader'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserDetails,onUrlChangeUserDetails } from './User/action-userDetails';
import { onUrlEntered } from './Views/DashBoard/ActionDashboard/action-navigation';

import UserValidation from './User/userValidation';

import DashBoard from './Views/DashBoard/dashBoard';
import Axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    if(this.props.location["pathname"] !=='/'){
      if([undefined,"undefined",null].indexOf(sessionStorage.getItem("userRole")) < 0){
        // this.props.onUrlEntered(sessionStorage.getItem("userRole"),this.props.location["pathname"]);
        Axios.defaults.headers.common["SM_USER"] = sessionStorage.getItem("userid");
        this.props.onUrlChangeUserDetails(sessionStorage.getItem("userRole"),sessionStorage.getItem("userName"));
      }

    }
  }
  
  handleLoginSubmit = (userId, passWord) => {
    try {
      Axios.defaults.headers.common["SM_USER"] = userId;
      this.props.getUserDetails(userId, passWord);
      sessionStorage.setItem("userid", userId);
    } catch {
      alert("Not Authorized");
    }
  }


  render() {
    sessionStorage.setItem("userRole", this.props.userDetails["userData"]["role"]);
    sessionStorage.setItem("userName", this.props.userDetails["userData"]["userid"]);
    console.log('initial data 11111', this.props.userDetails);
    //console.log('initial data 111112222', this.props.navigationDetails);
    console.log('user location', this.props.location);
    let view;
    console.log('next props 2222',this.props.userDetails);
    if (Object.keys(this.props.userDetails["userData"]).length === 0 ) {
      view = <Login handleLoginSubmit={this.handleLoginSubmit}
          userData={this.props.userDetails} />
    }
    else {
      view = <DashBoard userData={this.props.userDetails}
                path={this.props.location["pathname"]}/>;
    }
    return (
      <div className="App" ref="app">
        {this.props.userDetails["isLoading"] ? <Loader /> : <div></div>}
        {view}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state 111', state);
  return {
    userDetails: state.userDetails,
    navigationDetails: state.LeaderShipNavDetails
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserDetails: getUserDetails, onUrlChangeUserDetails : onUrlChangeUserDetails, onUrlEntered : onUrlEntered }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
