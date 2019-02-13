import React, { Component} from 'react';
import {ReactDOM} from 'react-dom';
import { Redirect, Route, NavLink, BrowserRouter, Switch } from 'react-router-dom';
import { NavigationData } from '../../Utils/Constants';
import BodyMain from './dashBoardBodyMain';
import DashBoardNavigation from './dashBoardNavigation';
import _ from "underscore";

import Tabs from '../../Common/Components/Tabs/tabs';
import Navs from '../../Common/Components/Navs/navs';
import Header from '../../Common/Components/Header/header';
import Footer from '../../Common/Components/Footer/footer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onNavChange, onTabChange } from './ActionDashboard/action-navigation';
import { onLogout, onLogoutTabs } from './ActionDashboard/action-logout';

import { withRouter } from 'react-router-dom';

import history from '../../history';
import './dashboard.css';

const getInitialNavData = (userData,path='/') => {
  console.log('user dataa 11111', userData);
  let initialDataObj = {
    navData: [],
    selectedNav: {},
    tabData: [],
    selectedTab: {}
  },
  roleData = NavigationData[userData["role"]],
  groupedNavData = _.groupBy(roleData, "id"),
  navArray,
  selectedNavId,
  selectedTabId;
  if(path!== '/'){
    navArray=path.split('/');
    selectedNavId=navArray[1];
    selectedTabId=navArray[2];
  }
  roleData.map(navObj => {
    let eachNavObj = {};
    eachNavObj["id"] = navObj["id"];
    eachNavObj["displayName"] = navObj["displayName"];
    eachNavObj["tabs"]=navObj["tabs"];
    initialDataObj["navData"].push(eachNavObj);
  });
  if(path!== '/'){
    initialDataObj["selectedNav"] = groupedNavData[selectedNavId][0];;
  }
  else{
    initialDataObj["selectedNav"] = initialDataObj["navData"][0];
  }

  if (initialDataObj["selectedNav"]["tabs"]) {
    initialDataObj["tabData"].push(...initialDataObj["selectedNav"]["tabs"]);
  }
  if (initialDataObj["tabData"].length > 0) {
    if(path!== '/'){
      initialDataObj["tabData"].map(tabObj=>{
        if(tabObj["id"]===selectedTabId){
          initialDataObj["selectedTab"]=JSON.parse(JSON.stringify(tabObj));
        }
        if(Object.keys(initialDataObj["selectedTab"]).length===0){
          initialDataObj["selectedTab"]=initialDataObj["tabData"][0];
        }
      })
    }else{
      initialDataObj["selectedTab"] = initialDataObj["tabData"][0];
    }

  }
  console.log('state object ***', initialDataObj);
  return initialDataObj;
}

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log('user update 22222',this.props.location);
  }
  handleNavChange = (selectedNav) => {
    let initialUserData = this.props.navigationDetails["initialFlag"] ?
      getInitialNavData(this.props.userDetails["userData"],this.props.path) :
      this.props.navigationDetails;
    this.props.selectNav(selectedNav, this.props.userDetails["userData"]["role"], initialUserData);
  }
  handleTabChange = (selectedTab) => {
    console.log('initial data 11111',this.props.navigationDetails["initialFlag"]);
    let initialUserData = this.props.navigationDetails["initialFlag"] ?
      getInitialNavData(this.props.userDetails["userData"],this.props.path) :
      this.props.navigationDetails;
    this.props.selectTab(selectedTab, initialUserData);
  }
  handleSignout = () => {
    console.log('signing out');
    this.props.onLogout();
    this.props.onLogoutTabs();
    this.props.history.push("/");
    
  }
  getRoutes = () => {
    let selectedNavigationData = [],
      routes = [];
    if (NavigationData[this.props.userDetails["userData"]["role"]]) {
      selectedNavigationData = NavigationData[this.props.userDetails["userData"]["role"]];
    }
    selectedNavigationData.map(navItem => {
      navItem["tabs"].map(tabItem => {
        routes.push(<Route path={`/${navItem["id"]}/${tabItem["id"]}`} component={() =>
          <BodyMain
            tabData={tabItem}
            navData={navItem}
          />} />);
      })
    })
    return <Switch>{routes}</Switch>;
  }

  render() {
    let routes = this.getRoutes(),
      selectedNavigationData;
    console.log('initial data',this.props.navigationDetails);
    if (this.props.navigationDetails["initialFlag"]) {
      selectedNavigationData = JSON.parse(JSON.stringify(getInitialNavData(this.props.userDetails["userData"],this.props.path)));
    }
    else {
      selectedNavigationData = JSON.parse(JSON.stringify(this.props.navigationDetails));
    }
    return (
      <div className='dashboard-view'>
        <Header
          userDetails={this.props.userDetails["userData"]}
          handleSignout={this.handleSignout} />
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
        <Footer />
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log('state 111', state);
  return {
    userDetails: state.userDetails,
    navigationDetails: state.LeaderShipNavDetails
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectNav: onNavChange, selectTab: onTabChange, onLogout: onLogout, onLogoutTabs }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));
