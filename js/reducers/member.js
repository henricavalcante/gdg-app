import { GET_MEMBERS_STARTED, GET_MEMBERS_FULFILLED, GET_MEMBERS_REJECTED } from '../actions/member';

const initialState = {
    isLoading: false,
    list: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MEMBERS_STARTED:
            return {
                ...state,
                isLoading: true
            };

        case GET_MEMBERS_FULFILLED:
            return {
                list: action.member,
                isLoading: false
            };

        case GET_MEMBERS_REJECTED:
            return {
                ...state,
                isLoading: false
            };
    }

    return state;
}
