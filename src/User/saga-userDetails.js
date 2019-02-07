import 'regenerator-runtime/runtime';
import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserDetails(action) {
  console.log('saga action worker', action);
  let userData = {}, role;

  const fetchedData = yield axios.get('https://genericspringrest.herokuapp.com/user/getcurrentuserinfo');
  console.log('saga fetched data', fetchedData);
  let responseData = fetchedData["data"];
  userData["userid"] = responseData["name"];
  if (responseData["roles"].indexOf("Leadership") !== -1) {
    console.log('leadership 11111');
    userData["role"] = "leadership";
  }
  else if (responseData["roles"].indexOf("Processor") !== -1) {
    userData["role"] = "processor";
  }
  else if (responseData["roles"].indexOf("QR") !== -1) {
    userData["role"] = "qrd";
  }
  console.log('saga userselected', userData);
  yield put({ type: "RECEIVED_USER_DETAILS", payload: userData });

}

export default function* actionWatcherUserDetails() {
  yield takeLatest('USER_DETAILS', fetchUserDetails)
}
