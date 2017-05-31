import database from '../database';

export const GET_MEMBERS_STARTED = 'GET_MEMBERS_STARTED';
export const GET_MEMBERS_REJECTED = 'GET_MEMBERS_REJECTED';
export const GET_MEMBERS_FULFILLED = 'GET_MEMBERS_FULFILLED';

export function getMembers() {
    return dispatch => {
        dispatch(getMembersStartedAction());
        return database.ref('/members')
            .once('value')
            .then(snap => snap.val())
            .then(members => Object.keys(members).map(key => ({...members[key], id: key})))
            .then(getMembersFulfilledAction)
            .catch(getMembersRejectedAction)
            .then(dispatch);
    }
}

function getMembersStartedAction() {
    return {
        type: GET_MEMBERS_STARTED
    }
}

function getMembersFulfilledAction(member) {
    console.log(member);
    return {
        type: GET_MEMBERS_FULFILLED,
        member
    };
}

function getMembersRejectedAction(error) {
    return {
        type: GET_MEMBERS_REJECTED,
        error
    }
}