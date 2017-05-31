import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';

export default function configureStore(onCompletion: () => void): any {
   /*
    const enhancer = compose(
        applyMiddleware(thunk, promise),
        devTools({
            nameserver: '10.0.0.119',
            port: 8000,
            realtime: true,
        }),
    );
*/
    const store = createStore(
        reducer,
        {},
        applyMiddleware(thunk, promise)
    );
    //persistStore(store, {storage: AsyncStorage}, onCompletion);

    return store;
}
