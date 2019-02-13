import { takeLatest, put, call } from 'redux-saga/effects';

const getUserDetailsOnURLchange = (role,userId) =>{
  console.log('user id ',userId);
  let userData={};
  userData["userid"]=userId;
  userData["role"]=role;
  return userData;
}

export const getUserDetails = (userId,passWord) => {
    console.log("You clicked on user: ",userId);
    return {
        type: 'USER_DETAILS',
        userId,
        passWord,
        payload:{}
    }
};
export const onUrlChangeUserDetails = (role,userId) => {
    console.log("You clicked on user: ",userId);
    return {
        type: 'USER_DETAILS_URL_CHANGE',
        payload:getUserDetailsOnURLchange(role,userId)
    }
};
