import { put, takeLatest, all } from 'redux-saga/effects';
import actionWatcherUserDetails from '../User/saga-userDetails';
import EmplyeeWatcher from '../Views/DashBoard/Home/HomeBody/Search/sagas/saga';


export default function* rootSaga() {
   yield all([
      actionWatcherUserDetails(),
      EmplyeeWatcher()
   ]);
}
