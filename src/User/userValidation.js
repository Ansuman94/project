import React, { Component } from 'react';
import {Redirect,Route,NavLink} from 'react-router-dom';
import Login from '../Views/Login/login';



class UserValidation extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log('role check 2222',this.props.userData);
    //if(Object.keys(this.props.userData).length <= 0){
      return <Redirect to="/login" />;
    // }
    // else{
    //   console.log('role check',this.props.userData);
    //   let role=this.props.userData["role"];
    //   return <Redirect to={`${role}/`} />;
    // }
  }
}

export default UserValidation;
