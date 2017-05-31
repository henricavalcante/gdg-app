import {combineReducers} from 'redux';

import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';
import member from './member';
import event from './event';

export default combineReducers({
    drawer,
    cardNavigation,
    routes,
    member,
    event
});
