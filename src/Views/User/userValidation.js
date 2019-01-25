import React, { Component } from 'react';
import {Redirect,Route,NavLink} from 'react-router-dom';
import Login from '../Views/Login/login';



class UserValidation extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log('2222',Object.keys(this.props.userData));
    if(Object.keys(this.props.userData).length <= 0){
      return <Redirect to="/login" />;
    }
    else{
      let role=this.props.userData["userDetails"];
      return <Redirect to={`${role}/`} />;
    }
  }
}

export default UserValidation;
