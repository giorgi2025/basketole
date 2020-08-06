import * as actionTypes from '../actions/actionTypes';
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    userProfile: {},
    allUsers: {},
    thisUserDetails: '',
    newUserCreated: false
};
export default function(state = initialState, action) {
    switch (action.type) {

        case actionTypes.INITIALIZE_STATUS: {
            return {
                ...state,
                newUserCreated: false,
            }
        }

        case actionTypes.SET_CURRENT_USER:
            console.log(action.payload);
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case actionTypes.USER_LOADING:
            return {
                ...state,
                loading: true
            };

        case actionTypes.NEW_USER:
            return {
                ...state,
                newUserCreated: action.payload
            };

        default:
            return state;
    }
}
