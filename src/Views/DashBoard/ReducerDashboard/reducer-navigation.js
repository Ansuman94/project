import { NavigationData } from '../../../Utils/Constants';
import Store from '../../../Store';
const getinitialState = () => {
    console.log('initial daa ', Store);
    let stateObj = {
        navData: [],
        selectedNav: {},
        tabData: [],
        selectedTab: {},
        initialFlag: true
    };
    // roleData= NavigationData["leadership"];
    // roleData.map(navObj=>{
    //   let eachNavObj={};
    //   eachNavObj["id"]=navObj["id"];
    //   eachNavObj["displayName"]=navObj["displayName"];
    //   stateObj["navData"].push(eachNavObj);
    // });
    // stateObj["selectedNav"]=stateObj["navData"][0];
    // if(roleData[0]["tabs"]){
    //   stateObj["tabData"].push(...roleData[0]["tabs"]);
    // }
    // if(stateObj["tabData"].length > 0){
    //   stateObj["selectedTab"]=stateObj["tabData"][0];
    // }
    // console.log('state object ***',stateObj);
    return stateObj;
}
const initialState = getinitialState();
export default function (state = { ...initialState }, action) {
    console.log('state , initial state', state, action);

    switch (action.type) {
        case 'NAV_CHANGE':
            // return {...state,...action.payload};
            console.log('reducer working nav', action.payload);
            return { ...state, ...action.payload };
            break;
        case 'TAB_CHANGE':
            console.log('reducer working nav', action.payload);
            return { ...state, ...action.payload };
        default:
            return state;
    }
    return state;
}
