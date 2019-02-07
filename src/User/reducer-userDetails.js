const getinitialState = () => {
    let stateObj = {
        userData: {},
        isLoading: false
    };
    return stateObj;
}
const initialState = getinitialState();
export default function (state = initialState, action) {
    console.log('saga 1111111', action, state);
    switch (action.type) {
        case 'USER_DETAILS':
            console.log("state:", state);
            console.log('reducer working', action.payload);
            return {
                ...state,
                ...{ userData: action.payload },
                isLoading: true
            };

        case 'RECEIVED_USER_DETAILS':
            console.log('reducer working', action.payload);

            return {
                ...state,
                ...{ userData: action.payload },
                isLoading: false
            };
        case 'ON_LOGOUT':
            console.log('saga login logout reducer');
            return { ...initialState };
        case 'USER_DETAILS_URL_CHANGE' :
            return {
                ...state,
                ...{ userData: action.payload },
                isLoading: false
            };
        default:
            return state;
    }

}
