import * as Actions from './actions';
import initialState from '../store/initialState';

export const MedicinesReducer = (state = initialState.medicines, action) => {
    switch (action.type){
        case Actions.DELETE_MEDICINE:
            return {
                ...state,
                list: [...action.payload]
            };

        case Actions.FETCH_MEDICINES:
            return {
                ...state,
                list: [...action.payload]
            };

        default:
            return state
    }
}
