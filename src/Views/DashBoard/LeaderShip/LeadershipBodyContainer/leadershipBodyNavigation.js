import React, { Component } from 'react';
import SearchGrid from './SearchGrid/SearchGrid';
import {Redirect} from 'react-router-dom';

class LeaderShipBodyNavigation extends Component {
  render() {
    return <Redirect to={`/leadership/${this.props.selectedNav["id"]}/${this.props.selectedTab["id"]}`} />
  }
}

export default LeaderShipBodyNavigation;
