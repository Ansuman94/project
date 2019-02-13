import { NavigationData } from '../../../Utils/Constants';
import _ from 'underscore';

//const leadershipNavData=NavigationData["leadership"];
const handleNavChange = (selectedNav, role) => {
  console.log('selectedNav', selectedNav);
  const selectedNavigationData = NavigationData[role];
  let navigationObj = {
    selectedNav: {},
    tabData: [],
    selectedTab: {},
    initialFlag: false
  }
  let groupedNavData = _.groupBy(selectedNavigationData, "id");
  console.log('selectedNav11111', selectedNav);
  //navigationObj["navData"]=JSON.parse(JSON.stringify(groupedNavData[selectedNav["id"]][0]));
  if (groupedNavData[selectedNav["id"]][0]["tabs"]) {
    navigationObj["tabData"] = groupedNavData[selectedNav["id"]][0]["tabs"];
    navigationObj["selectedTab"] = navigationObj["tabData"][0];
  }
  navigationObj["selectedNav"] = JSON.parse(JSON.stringify(selectedNav));

  return navigationObj;
}
const handleTabChange = (selectedTab, initialUserData) => {
  let navigationObj = {
    selectedTab: {},
    initialFlag: false
  }
  navigationObj["navData"] = initialUserData["navData"];
  navigationObj["selectedNav"] = initialUserData["selectedNav"];
  navigationObj["tabData"] = initialUserData["tabData"];
  navigationObj["selectedTab"] = JSON.parse(JSON.stringify(selectedTab));
  return navigationObj;
}
const handleUrlChange=(role,path)=>{
  console.log('url changing',path,role);
  //console.log('user update 111111111111',navArray);
  let selectedNavigationData = NavigationData[role],
      navArray=path.split("/"),
      selectedNavId=navArray[1],
      selectedTabId=navArray[2];
  let navigationObj = {
    navData: [],
    selectedNav: {},
    tabData: [],
    selectedTab: {},
    initialFlag: false
  }
  let groupedNavData = _.groupBy(selectedNavigationData, "id");
  console.log('url changing 11',navArray,selectedTabId,selectedNavId);
  console.log('url changing 11111111',groupedNavData);
  selectedNavigationData.map(navObj => {
    let eachNavObj = {};
    eachNavObj["id"] = navObj["id"];
    eachNavObj["displayName"] = navObj["displayName"];
    navigationObj["navData"].push(eachNavObj);
  });
  navigationObj["selectedNav"] = groupedNavData[selectedNavId][0];
  if (groupedNavData[selectedNavId][0]["tabs"]) {
    navigationObj["tabData"] = groupedNavData[selectedNavId][0]["tabs"];
    navigationObj["tabData"].map(tabObj=>{
      if(tabObj["id"]===selectedTabId){
        navigationObj["selectedTab"]=JSON.parse(JSON.stringify(tabObj));
      }
      if(Object.keys(navigationObj["selectedTab"]).length===0){
        navigationObj["selectedTab"]=navigationObj["tabData"][0];
      }
    })
  }
  return navigationObj;
}

export const onNavChange = (selectedNav, role, initialData) => {
  let updatedData = handleNavChange(selectedNav, role);
  return {
    type: 'NAV_CHANGE',
    payload: { ...initialData, ...updatedData },
    role: role

  }
}
export const onTabChange = (selectedTab, initialUserData) => {
  console.log('initial data 111',initialUserData);
  let updatedData = handleTabChange(selectedTab, initialUserData);

  return {
    type: 'TAB_CHANGE',
    payload: updatedData
  }
}
export const onUrlEntered = (role,path) => {
    console.log('initial data 33333',handleUrlChange(role,path));
    return {
        type: 'ON_URL_CHANGE',
        payload: handleUrlChange(role,path)
    }
}
