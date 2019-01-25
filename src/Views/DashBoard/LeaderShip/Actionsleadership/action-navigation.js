import {NavigationData} from '../../../../Utils/Constants';
import _ from 'underscore';

const leadershipNavData=NavigationData["leadership"];
const handleNavChange=(selectedNav)=>{
  console.log('selectedNav',selectedNav);
  let navigationObj={
    selectedNav:{},
    tabData:[],
    selectedTab:{}
  }
  let groupedNavData=_.groupBy(leadershipNavData,"id");
  console.log('selectedNav11111',selectedNav);
  if(groupedNavData[selectedNav["id"]][0]["tabs"]){
    navigationObj["tabData"]=groupedNavData[selectedNav["id"]][0]["tabs"];
    navigationObj["selectedTab"]=navigationObj["tabData"][0];
  }
  navigationObj["selectedNav"]=JSON.parse(JSON.stringify(selectedNav));

  return navigationObj;
}
const handleTabChange=(selectedTab)=>{
  let navigationObj={
    selectedTab:{}
  }
  navigationObj["selectedTab"]=JSON.parse(JSON.stringify(selectedTab));
  return navigationObj;
}
export const onNavChange = (selectedNav) => {
    return {
        type: 'NAV_CHANGE',
        payload: handleNavChange(selectedNav)

    }
}
export const onTabChange = (selectedTab) => {
    return {
        type: 'TAB_CHANGE',
        payload: handleTabChange(selectedTab)
    }
}
