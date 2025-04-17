import { createSelector } from 'reselect'

const medicinesSelector = (state) => state.medicines

export const getMedicines = createSelector([medicinesSelector], (state) => state.list)

export const getMedicineNames = createSelector([medicinesSelector], (state) => state.names)
