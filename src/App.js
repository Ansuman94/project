import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import history from './history';

import Login from './Views/Login/login';
import Loader from './Common/Components/Loader/loader'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserDetails } from './User/action-userDetails';

import UserValidation from './User/userValidation';

import DashBoard from './Views/DashBoard/dashBoard';
import Axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
  }
  handleLoginSubmit = (userId, passWord) => {
    console.log("login submited", userId, passWord);
    // this.props.getUserDetails(userId, passWord);
    console.log('check1111', this.props);
    try {
      Axios.defaults.headers.common["SM_USER"] = userId;
      this.props.getUserDetails(userId, passWord);
      sessionStorage.setItem("userid", userId);
    } catch {
      alert("Not Authorized");
    }
  }
  render() {
    console.log('user data', this.props.userDetails);
    let view;
    if (Object.keys(this.props.userDetails["userData"]).length === 0) {
      view = <Route path="/" exact component={() =>
        <Login handleLoginSubmit={this.handleLoginSubmit}
          userData={this.props.userDetails}
        />} />
    }
    else {
      if (this.props.userDetails["isLoading"]) {

      }
      view = <DashBoard userData={this.props.userDetails} />;
    }
    return (
      <div className="App">
        {this.props.userDetails["isLoading"] ? <Loader /> : <div></div>}
        {view}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state 111', state);
  return {
    userDetails: state.userDetails
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserDetails: getUserDetails }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
