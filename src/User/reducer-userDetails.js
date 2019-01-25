export default function (state = {}, action) {
  console.log('saga 1111111',action,state);
    switch (action.type) {
        case 'USER_DETAILS':
            // return {...state,...action.payload};
            console.log('reducer working',action.payload);
            // let user={};
            // user["userDetails"]=action.payload;
            // console.log('reducer working222',);
            return {...state,...action.payload};
            break;
        case 'RECEIVED_USER_DETAILS':
        console.log('saga state 111',{...state,...action.payload});
            return {...state,...action.payload};
        case 'ON_LOGOUT':
            console.log('saga login logout reducer');
            return {};
        default :
            return state;
    }
    return state;

}
