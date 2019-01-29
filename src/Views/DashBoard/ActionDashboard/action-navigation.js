import {NavigationData} from '../../../Utils/Constants';
import _ from 'underscore';

//const leadershipNavData=NavigationData["leadership"];
const handleNavChange=(selectedNav,role)=>{
  console.log('selectedNav',selectedNav);
  const selectedNavigationData=NavigationData[role];
  let navigationObj={
    selectedNav:{},
    tabData:[],
    selectedTab:{},
    initialFlag:false
  }
  let groupedNavData=_.groupBy(selectedNavigationData,"id");
  console.log('selectedNav11111',selectedNav);
  //navigationObj["navData"]=JSON.parse(JSON.stringify(groupedNavData[selectedNav["id"]][0]));
  if(groupedNavData[selectedNav["id"]][0]["tabs"]){
    navigationObj["tabData"]=groupedNavData[selectedNav["id"]][0]["tabs"];
    navigationObj["selectedTab"]=navigationObj["tabData"][0];
  }
  navigationObj["selectedNav"]=JSON.parse(JSON.stringify(selectedNav));

  return navigationObj;
}
const handleTabChange=(selectedTab)=>{
  let navigationObj={
    selectedTab:{},
    initialFlag:false
  }
  navigationObj["selectedTab"]=JSON.parse(JSON.stringify(selectedTab));
  return navigationObj;
}

export const onNavChange = (selectedNav,role,initialData) => {
  let updatedData=handleNavChange(selectedNav,role);
    return {
        type: 'NAV_CHANGE',
        payload: {...initialData,...updatedData},
        role: role

    }
}
export const onTabChange = (selectedTab,role,initialData) => {
    let updatedData=handleTabChange(selectedTab);

    return {
        type: 'TAB_CHANGE',
        payload: {...initialData,...updatedData}
    }
}
// export const onInitialLoad = (role) => {
//     return {
//         type: 'NAV_INITIAL',
//         payload: handleInitialNav(role)
//     }
// }
