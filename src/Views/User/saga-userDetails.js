import 'regenerator-runtime/runtime';
import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchUserDetails(action) {
  console.log('saga action worker',action);
  let userData={};
  const fetchedData = yield fetch('./Fixtures/userDetails.json')
        .then(response => response.json());
  console.log('saga fetched data',fetchedData);
  fetchedData.map(item=>{
    if(item["userid"]===action["userId"] && item["password"]===action["passWord"]){
      userData=JSON.parse(JSON.stringify(item));
      console.log('saga 22222',userData);
    }
  })
  console.log('saga userselected',userData);
  yield put({ type: "RECEIVED_USER_DETAILS", payload: userData });

}

export default function* actionWatcherUserDetails (){
    yield takeLatest('USER_DETAILS', fetchUserDetails)
}
