export const onLogout = () => {
  console.log('saga login logout action');
    return {
        type: 'ON_LOGOUT',
        payload : ''
    }
}
