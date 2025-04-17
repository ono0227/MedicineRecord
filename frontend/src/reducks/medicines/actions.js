export const DELETE_MEDICINE = 'DELETE_MEDICINE'
export const deleteMedicinesAction = (medicines) => {
  return {
    type: 'DELETE_MEDICINE',
    payload: medicines,
  }
}

export const FETCH_MEDICINES = 'FETCH_MEDICINES'
export const fetchMedicinesAction = (medicines) => {
  return {
    type: 'FETCH_MEDICINES',
    payload: medicines,
  }
}

export const SET_MEDICINE_NAMES = 'SET_MEDICINE_NAMES'
export const setMedicineNamesAction = (medicineNames) => {
  return {
    type: 'SET_MEDICINE_NAMES',
    payload: medicineNames,
  }
}
