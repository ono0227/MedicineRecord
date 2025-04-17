import initialState from '../store/initialState'
import * as Actions from './actions'

export const MedicinesReducer = (state = initialState.medicines, action) => {
  switch (action.type) {
    case Actions.DELETE_MEDICINE:
      return {
        ...state,
        list: [...action.payload],
      }

    case Actions.FETCH_MEDICINES:
      return {
        ...state,
        list: [...action.payload],
      }
    case Actions.SET_MEDICINE_NAMES:
      return {
        ...state,
        names: action.payload,
      }
    default:
      return state
  }
}
