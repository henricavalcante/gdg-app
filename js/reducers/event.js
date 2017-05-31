import { GET_EVENTS_STARTED, GET_EVENTS_FULFILLED, GET_EVENTS_REJECTED, SELECT_EVENT } from '../actions/event';

const initialState = {
    isLoading: false,
    list: [],
    selected: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS_STARTED:
            return {
                ...state,
                isLoading: true
            };

        case GET_EVENTS_FULFILLED:
            return {
                list: action.events,
                isLoading: false
            };

        case GET_EVENTS_REJECTED:
            return {
                ...state,
                isLoading: false
            };

        case SELECT_EVENT:
            return {
                ...state,
                selected: action.event
            }
    }

    return state;
}
