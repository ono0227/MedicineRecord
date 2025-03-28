import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getUserName = createSelector(
    [usersSelector],
    state => state.username
)

export const getEmail = createSelector(
    [usersSelector],
    state => state.email
)

export const getUserImage = createSelector(
    [usersSelector],
    state => state.userimage
)
