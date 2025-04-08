import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { UsersReducer } from "../users/reducers";
import { MedicinesReducer } from "../medicines/reducers";
import { PostsReducer } from "../posts/reducers";
import { CategoriesReducer } from '../categories/reducers';

export default function createStore() {
    const rootReducer = combineReducers({
        users: UsersReducer,
        medicines: MedicinesReducer,
        posts: PostsReducer,
        categories: CategoriesReducer,
    });

    const enhancers = composeWithDevTools(
        applyMiddleware(
            thunk,
        )
    );

    return reduxCreateStore(rootReducer, enhancers);
}
