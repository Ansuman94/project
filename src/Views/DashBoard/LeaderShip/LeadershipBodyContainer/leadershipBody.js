import React, { Component } from 'react';
import SearchGrid from './SearchGrid/SearchGrid';
import WRAging from './WRAging/WRAging';
import {Redirect,Route,BrowserRouter} from 'react-router-dom';

import LeadershipBodyNavigation from './leadershipBodyNavigation'

class LeaderShipBody extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log('body 11111',this.props);
    let BodyView;
    if(this.props.selectedNav["id"]==='home' && this.props.selectedTab["id"]==="search"){
      BodyView=<SearchGrid />;
    }
    else{
      BodyView=<WRAging />;
    }

    return(
        <div>
          {BodyView}
        </div>

    );
  }
}

export default LeaderShipBody;
