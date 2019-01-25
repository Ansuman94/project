import React, { Component } from 'react';
import './header.css';
import {Redirect} from 'react-router-dom';
class Header extends Component {
  // handleSignout=()=>{
  //   console.log('signing out');
  //     return <Redirect to="/login" />;
  //     //this.props.history.push("/login");
  // }
  render() {
    console.log('userId',this.props.userDetails);
    let headerRightView;
    if(Object.keys(this.props.userDetails).length > 0){
      headerRightView=<div class="header-right">
        <a >{`Hi ${this.props.userDetails["userid"]}`}</a>
        <a onClick={()=>this.props.handleSignout()}>Log out</a>
      </div>;
    }
    return (
      <div class="header">
        <a href="#default" class="logo">CompanyLogo</a>
        {headerRightView}
      </div>
    );
  }
}

export default Header;
