import React, { Component } from 'react';
import {Redirect,Route,NavLink} from 'react-router-dom';
class Navigation extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Redirect to={`/${this.props.selectedNav["id"]}/${this.props.selectedTab["id"]}`} />
    )
  }
}
export default Navigation;
