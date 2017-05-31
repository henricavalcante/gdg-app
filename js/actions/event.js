import database from '../database';

export const GET_EVENTS_STARTED = 'GET_EVENTS_STARTED';
export const GET_EVENTS_REJECTED = 'GET_EVENTS_REJECTED';
export const GET_EVENTS_FULFILLED = 'GET_EVENTS_FULFILLED';
export const SELECT_EVENT = 'SELECT_EVENT';

export function getEvents() {
    return dispatch => {
        dispatch(loadEventsStartedAction());
        return database.ref('/events')
            .once('value')
            .then(snap => snap.val())
            .then(members => Object.keys(members).map(key => ({...members[key], id: key})))
            .then(members => members.filter(member => member.status === 'upcoming'))
            .then(loadEventsFulfilledAction)
            .catch(loadEventsRejectedAction)
            .then(dispatch);
    }
}

export function selectEvent(event) {
    return dispatch => dispatch(selectEventAction(event));
}

function loadEventsStartedAction() {
    return {
        type: GET_EVENTS_STARTED
    }
}

function loadEventsFulfilledAction(events) {
    return {
        type: GET_EVENTS_FULFILLED,
        events
    };
}

function loadEventsRejectedAction(error) {
    return {
        type: GET_EVENTS_REJECTED,
        error
    }
}

function selectEventAction(event) {
    return {
        type: SELECT_EVENT,
        event
    }
}