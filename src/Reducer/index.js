import {combineReducers} from 'redux';
import UserDetails from '../User/reducer-userDetails';
import LeaderShipNav from '../Views/DashBoard/LeaderShip/ReducerLeadership/reducer-navigation';

const allReducers = combineReducers({
    userDetails: UserDetails,
    LeaderShipNavDetails:LeaderShipNav
});

export default allReducers;
