import React, { Component } from 'react';
import {Redirect,Route,NavLink} from 'react-router-dom';




class Sample extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>sample data{this.props.tabData["id"]}</div>
    )
  }
}

export default Sample;
