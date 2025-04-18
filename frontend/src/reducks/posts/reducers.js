import initialState from '../store/initialState'
import * as Actions from './actions'

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.DELETE_POST:
      return {
        ...state,
        list: [...action.payload],
      }

    case Actions.FETCH_POSTS:
      return {
        ...state,
        list: [...action.payload],
      }

    default:
      return state
  }
}
