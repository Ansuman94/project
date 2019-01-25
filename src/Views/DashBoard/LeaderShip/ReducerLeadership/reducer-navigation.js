import {NavigationData} from '../../../../Utils/Constants';
const getinitialState=()=>{
  let stateObj={
    navData:[],
    selectedNav:{},
    tabData:[],
    selectedTab:{}
  },
  leadershipData=NavigationData["leadership"];
  leadershipData.map(navObj=>{
    let eachNavObj={};
    eachNavObj["id"]=navObj["id"];
    eachNavObj["displayName"]=navObj["displayName"];
    stateObj["navData"].push(eachNavObj);
  });
  stateObj["selectedNav"]=stateObj["navData"][0];
  if(leadershipData[0]["tabs"]){
    stateObj["tabData"].push(...leadershipData[0]["tabs"]);
  }
  if(stateObj["tabData"].length > 0){
    stateObj["selectedTab"]=stateObj["tabData"][0];
  }
  console.log('state object ***',stateObj);
  return stateObj;
}
const initialState=getinitialState();
export default function (state = {...initialState}, action) {
  console.log('state , initial state',state,initialState,action);
    switch (action.type) {
        case 'NAV_CHANGE':
            // return {...state,...action.payload};
            console.log('reducer working nav',action.payload);
            return {...state,...action.payload};
            break;
        case 'TAB_CHANGE':
            console.log('reducer working nav',action.payload);
            return {...state,...action.payload};
        default :
            return state;
    }
    return state;
}
