import * as actionTypes from '../actions/actionTypes';
const initialState = {
    attendee: [],
};
export default function(state = initialState, action) {
    switch (action.type) {

        case actionTypes.GET_EXISTING_ATTENDEE:
            return {
                ...state,
                attendee: action.payload
            };

        default:
            return state;
    }
}
