import { createStore } from 'vuex'
import auth from './modules/auth';

const store = new createStore({
    modules: {
        auth
    }
});

export default store;