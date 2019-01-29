import {combineReducers} from 'redux';
// import UserDetails from '../User/reducer-userDetails';
// import LeaderShipNav from '../Views/DashBoard/LeaderShip/ReducerLeadership/reducer-navigation';
import UserDetails from '../User/reducer-userDetails';
import LeaderShipNav from '../Views/DashBoard/ReducerDashboard/reducer-navigation';

const allReducers = combineReducers({
    userDetails: UserDetails,
    LeaderShipNavDetails:LeaderShipNav
});
// const allReducers = (state = {}, action: Action) => {
//   return {
//     UserDetails: UserDetails(state.UserDetails, action),
//     // merge languageCodes with original action object, now you have access in translations reducer
//     LeaderShipNav: LeaderShipNav(state.LeaderShipNav,action)
//   };
// };

export default allReducers;
