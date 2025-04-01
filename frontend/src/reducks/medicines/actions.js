export const DELETE_MEDICINE = "DELETE_MEDICINE";
export const deletemedicinesAction = (medicines) => {
    return {
        type: "DELETE_MEDICINE",
        payload: medicines
    }
}

export const FETCH_MEDICINES = "FETCH_MEDICINES";
export const fetchmedicinesAction = (medicines) => {
    return {
        type: "FETCH_MEDICINES",
        payload: medicines
    }
}
