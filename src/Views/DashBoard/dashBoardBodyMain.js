import React, { Component } from 'react';
import { Redirect, Route, NavLink } from 'react-router-dom';

import Search from './Home/HomeBody/Search/search';
import WRAging from './Home/HomeBody/WRAging/wrAging';


class BodyMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let view;
    if (this.props.tabData["id"] === 'search') {
      view = <Search />;
    }
    else {
      view = <WRAging />;
    }
    return (

      <div>{view}</div>
    )
  }
}

export default BodyMain;
