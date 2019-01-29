import React, { Component } from 'react';
import {Redirect,Route,NavLink,BrowserRouter,Switch} from 'react-router-dom';
import {NavigationData} from '../../Utils/Constants';
import Sample from './sampleFile';
import DashBoardNavigation from './dashBoardNavigation';

import Tabs from '../../Common/Components/Tabs/tabs';
import Navs from '../../Common/Components/Navs/navs';
import Header from '../../Common/Components/Header/header';
import Footer from '../../Common/Components/Footer/footer';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onNavChange,onTabChange} from './ActionDashboard/action-navigation';
import {onLogout} from './ActionDashboard/action-logout';

import { withRouter } from 'react-router-dom';

import history from '../../history';

const getInitialNavData=(userData)=>{
  console.log('user dataa 11111',userData);
  let stateObj={
    navData:[],
    selectedNav:{},
    tabData:[],
    selectedTab:{}
  },
  roleData= NavigationData[userData["role"]];
  roleData.map(navObj=>{
    let eachNavObj={};
    eachNavObj["id"]=navObj["id"];
    eachNavObj["displayName"]=navObj["displayName"];
    stateObj["navData"].push(eachNavObj);
  });
  stateObj["selectedNav"]=stateObj["navData"][0];
  if(roleData[0]["tabs"]){
    stateObj["tabData"].push(...roleData[0]["tabs"]);
  }
  if(stateObj["tabData"].length > 0){
    stateObj["selectedTab"]=stateObj["tabData"][0];
  }
  console.log('state object ***',stateObj);
  return stateObj;
}

class DashBoard extends Component {
  constructor(props){
    super(props);
  }
  handleNavChange=(selectedNav)=>{
    let initialUserData=getInitialNavData(this.props.userDetails);
    this.props.selectNav(selectedNav,this.props.userDetails["role"],initialUserData);
  }
  handleTabChange=(selectedTab)=>{
    let initialUserData=getInitialNavData(this.props.userDetails);
    this.props.selectTab(selectedTab,this.props.userDetails["role"],initialUserData);
  }
  handleSignout=()=>{
    console.log('signing out');
    this.props.onLogout();
    // this.props.history.push("/");
  }
  getRoutes=()=>{
    let selectedNavigationData=[],
        routes=[];
    if(NavigationData[this.props.userDetails["role"]]){
      selectedNavigationData=NavigationData[this.props.userDetails["role"]];
    }
    selectedNavigationData.map(navItem=>{
      navItem["tabs"].map(tabItem=>{
        routes.push(<Route path={`/${navItem["id"]}/${tabItem["id"]}`} component={()=><Sample tabData={tabItem}/>}/>);
      })
    })
    return <Switch>{routes}</Switch>;
  }

  render() {
    let routes=this.getRoutes(),
        selectedNavigationData;
    console.log('check 11111111111',this.props.navigationDetails);
    if(this.props.navigationDetails["initialFlag"]){
      selectedNavigationData=JSON.parse(JSON.stringify(getInitialNavData(this.props.userDetails)));
    }
    else{
        console.log('check 11111111111222222',this.props.navigationDetails);
      selectedNavigationData=JSON.parse(JSON.stringify(this.props.navigationDetails));
    }
    return(
      <div>
        <Header
        userDetails={this.props.userDetails}
        handleSignout={this.handleSignout}/>
        <Navs
          handleNavChange={this.handleNavChange}
          data={selectedNavigationData["navData"]}
          selectedNav={selectedNavigationData["selectedNav"]}
        />
        <Tabs
          handleTabChange={this.handleTabChange}
          data={selectedNavigationData["tabData"]}
          selectedTab={selectedNavigationData["selectedTab"]}
        />
        {routes}
        <DashBoardNavigation
        selectedNav={selectedNavigationData["selectedNav"]}
        selectedTab={selectedNavigationData["selectedTab"]}
        />
        <Footer/>
      </div>
    )
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));
