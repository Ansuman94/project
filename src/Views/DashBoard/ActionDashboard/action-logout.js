export const onLogout = () => {
    console.log('saga login logout action');
    return {
        type: 'ON_LOGOUT',
        payload: ''
    }
}
export const onLogoutTabs = () => {
    console.log('saga login logout action');
    return {
        type: 'ON_LOGOUT_TABS',
        payload: ''
    }
}
