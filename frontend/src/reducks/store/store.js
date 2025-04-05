import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { UsersReducer } from "../users/reducers";
import { MedicinesReducer } from "../medicines/reducers";
import { PostsReducer } from "../posts/reducers";
import { CategoriesReducer } from '../categories/reducers';

export default function createStore(history) {
    const rootReducer = combineReducers({
        router: connectRouter(history),
        users: UsersReducer,
        medicines: MedicinesReducer,
        posts: PostsReducer,
        categories: CategoriesReducer
    });

    const enhancers = composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    );

    return reduxCreateStore(rootReducer, enhancers);
}
