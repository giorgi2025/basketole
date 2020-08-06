import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';
import * as actionTypes from './actionTypes';

// Register User
export const registerUser = (newUser, history) => dispatch => {

    axios
        .post('/api/user/register', newUser)
        .then(res => {

            if(res.data.success === true) {
                dispatch({
                    type: actionTypes.NEW_USER,
                    payload: true
                })
            }
        })
        .catch(err => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        });
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post('/api/user/login', userData)
        .then(res => {
            // Save to localstorage
            console.log(res);
            // Set token to localStorage
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const initializeStatus = () => dispatch => {
    dispatch({
        type: actionTypes.INITIALIZE_STATUS,
    })
}

export const sendConfirmUsername = username =>dispatch =>{
    axios.post('/api/user/send-confirmEmail',{username:username})
         .then(res=>{
             console.log(res.data);
         })
         .catch(err =>
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        );
}
export const forgotPassword = email =>dispatch =>{
    console.log(email)
    axios.post('/api/user/forgotPassword',{email:email})
         .then(res=>{
            //  console.log(res.data);
         })
         .catch(err =>
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        );
}
export const passwordReset = data =>dispatch =>{
    console.log(data)
    axios.post('/api/user/savepasswordwithverify',data)
         .then(res=>{
             if(res.data.status){
                window.location = '/';
             }
         })
         .catch(err =>
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.err
            })
        );
}
export const confirmPass = data =>dispatch =>{
    axios.post('/api/user/confirm-email',data)
        .then(res=>{
            if(res.data.status){
            window.location = '/';
            }
        })
        .catch(err => {
            console.log(err)
        // dispatch({
        //     type: actionTypes.GET_ERRORS,
        //     payload: err.response.err
        // })
        });
}
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    };
};



// User loading
export const setUserLoading = () => {
    return {
        type: actionTypes.USER_LOADING
    };
};

//My own actions
export const allAttendees = () => dispatch => {
    axios.post('/api/attendee/allAttendees')
        .then(res => {
            dispatch({
                type: actionTypes.GET_EXISTING_ATTENDEE,
                payload: res.data.attendee
            })
            window.open( "/attendee", "_newtab");
        })
        .catch(err => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        })

}

export const getExistingAttendee = (attendeeObj) => dispatch => {
    axios.post('/api/attendee/getExistingAttendee', attendeeObj)
        .then(res => {
            dispatch({
                type: actionTypes.GET_EXISTING_ATTENDEE,
                payload: res.data.attendee
            })
            window.open( "/attendee", "_newtab");
        })
        .catch(err => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const addNewAttendee = (attendeeObj) => dispatch => {
    axios.post('/api/attendee/addNewAttendee', attendeeObj)
        .then(res => {
            // console.log(res.data)
        })
        .catch(err => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        })
}


export const searchAttendees = (attendeeObj) => dispatch => {
    axios.post('/api/attendee/searchAttendees', attendeeObj)
        .then(res => {
            dispatch({
                type: actionTypes.GET_EXISTING_ATTENDEE,
                payload: res.data.attendee
            })
            window.open( "/attendee", "_newtab");
        })
        .catch(err => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    dispatch({ type: 'USER_LOGOUT' })
};
