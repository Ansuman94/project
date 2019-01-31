import { NavigationData } from '../../../Utils/Constants';
const getinitialState = () => {
    let stateObj = {
        navData: [],
        selectedNav: {},
        tabData: [],
        selectedTab: {},
        initialFlag: true
    };
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
        case 'ON_LOGOUT_TABS': {
            return { ...initialState };
        }
        default:
            return state;
    }
    return state;
}
