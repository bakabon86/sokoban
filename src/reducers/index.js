import { combineReducers } from 'redux';

import Auth from './auth';
import Language from './language';
import Navigator from './navigation';
import reducerLogin from './login';
import reducerPush from './push';
import reducerPull from './pull';

const appReducer =  combineReducers({
	Auth,
	Language,
	Navigator,
	reducerLogin,
	reducerPush,
	reducerPull
});

const rootReducer = (state,action) => {
	if(action.type === 'LOGOUT'){
		state = undefined
	}

	return appReducer(state,action)
}

export default (rootReducer)