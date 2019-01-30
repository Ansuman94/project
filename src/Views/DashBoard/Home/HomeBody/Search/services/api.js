import axios from 'axios';

export const fetchEmpData = params => {
    console.log('fetchin data');
    return axios.get("https://genericspringrest.herokuapp.com/employee",
        { params: params }
    );
}

export const fetchDepData = params => {
    return axios.get("https://genericspringrest.herokuapp.com/department",
        { params: params });
}

export const fetchUserDetails = () => {
    return axios.get("https://genericspringrest.herokuapp.com/user/getcurrentuserinfo");
}

