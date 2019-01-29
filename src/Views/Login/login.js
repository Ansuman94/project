import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './login.css';


class Login extends Component {
  render() {
    console.log('saga login rendering',this.props.userData);
    // if(Object.keys(this.props.userData).length > 0){
    //   let role=this.props.userData["role"];
    //   console.log('role',this.props.userData["role"]);
    //   //return <Redirect to={`${role}/`} />;
    //   return <Redirect to="dashboard" />;
    // }
    return (
      <div className="Login">
        <div><input type="text" ref="userId" placeHolder="UserId"/></div>
        <div><input type="text" ref="passWord" placeHolder="Password" /></div>
        <button onClick={()=>this.props.handleLoginSubmit(this.refs.userId.value,this.refs.passWord.value)}>Submit</button>
      </div>
    );
  }
}

export default Login;
