import React, { Component } from 'react';
import { Redirect, Route, NavLink } from 'react-router-dom';

import Search from './Home/HomeBody/Search/search';
import WRAging from './Home/HomeBody/WRAging/wrAging';
import WRAgingReal from './Home/HomeBody/WRAgingReal/WRAgingReal';
import CurrentStatus from './Home/HomeBody/CurrentStatus/currentStatus';


class BodyMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let view;
    if (this.props.tabData["id"] === 'search') {
      view = <Search />;
    }
    else if (this.props.tabData["id"] === 'currentstatus') {
      view = <CurrentStatus />;
    }
    else if (this.props.tabData["id"] === 'wraging') {
      view = <WRAgingReal />;
    }
    else{
      view = <WRAging />;
    }

    return (

      <div>{view}</div>
    )
  }
}

export default BodyMain;
