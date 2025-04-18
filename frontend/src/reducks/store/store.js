import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { CategoriesReducer } from '../categories/reducers'
import { MedicinesReducer } from '../medicines/reducers'
import { PostsReducer } from '../posts/reducers'
import { UsersReducer } from '../users/reducers'

export default function createStore() {
  const rootReducer = combineReducers({
    users: UsersReducer,
    medicines: MedicinesReducer,
    posts: PostsReducer,
    categories: CategoriesReducer,
  })

  const enhancers = composeWithDevTools(applyMiddleware(thunk))

  return reduxCreateStore(rootReducer, enhancers)
}
