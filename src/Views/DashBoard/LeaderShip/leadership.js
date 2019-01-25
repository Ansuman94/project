import React, { Component } from 'react';
import {NavigationData} from '../../../Utils/Constants';
import Tabs from '../../../Common/Components/Tabs/tabs';
import Navs from '../../../Common/Components/Navs/navs';
import LeadershipBody from './LeadershipBodyContainer/leadershipBody';
import LeadershipBodyNavigation from './LeadershipBodyContainer/leadershipBodyNavigation';
import Header from '../../../Common/Components/Header/header';
import Footer from '../../../Common/Components/Footer/footer';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onNavChange,onTabChange} from './Actionsleadership/action-navigation';
import {onLogout} from './Actionsleadership/action-logout';

import {BrowserRouter,Route,Redirect,DefaultRoute} from 'react-router-dom';


import history from '../../../history';


const navData=NavigationData["leadership"];

class Leadership extends Component {
  handleNavChange=(selectedNav)=>{
    this.props.selectNav(selectedNav);
  }
  handleTabChange=(selectedTab)=>{
    this.props.selectTab(selectedTab);
  }
  handleSignout=()=>{
    console.log('signing out');
    this.props.onLogout();
    //return <Redirect to="/login" />;
    this.props.history.push("/login");
  }
  render() {
    console.log('nav change 1111222222',`/leadership/${this.props.navigationDetails.selectedNav["id"]}/${this.props.navigationDetails.selectedTab["id"]}`);
    return (
      <div >
        <Header
        userDetails={this.props.userDetails}
        handleSignout={this.handleSignout}/>
        <Navs
          handleNavChange={this.handleNavChange}
          data={this.props.navigationDetails["navData"]}
          selectedNav={this.props.navigationDetails["selectedNav"]}
        />
        <Tabs
          handleTabChange={this.handleTabChange}
          data={this.props.navigationDetails["tabData"]}
          selectedTab={this.props.navigationDetails["selectedTab"]}
        />

         <BrowserRouter>
          <Route
            //path={`/leadership/:${this.props.navigationDetails.selectedNav["id"]}/:${this.props.navigationDetails.selectedTab["id"]}`}
            //path={`/:leadership/?`}
            component={()=><LeadershipBody
                            selectedTab={this.props.navigationDetails["selectedTab"]}
                            selectedNav={this.props.navigationDetails["selectedNav"]}/>}
          />


        </BrowserRouter>

        {/*<LeadershipBody
          selectedTab={this.props.navigationDetails["selectedTab"]}
          selectedNav={this.props.navigationDetails["selectedNav"]}
        />*/}
        <LeadershipBodyNavigation
         selectedTab={this.props.navigationDetails["selectedTab"]}
         selectedNav={this.props.navigationDetails["selectedNav"]}
        />
        <Footer/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('state 111',state);
    return {
        userDetails: state.userDetails,
        navigationDetails:state.LeaderShipNavDetails
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({selectNav: onNavChange,selectTab : onTabChange, onLogout :onLogout}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Leadership);;
