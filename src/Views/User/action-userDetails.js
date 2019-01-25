import { takeLatest, put, call } from 'redux-saga/effects';

export const getUserDetails = (userId,passWord) => {
    console.log("You clicked on user: ",userId);
    return {
        type: 'USER_DETAILS',
        userId,
        passWord,
        payload:{}
    }
};
