import { deleteMedicinesAction, fetchMedicinesAction, setMedicineNamesAction } from "./actions";
import { push } from "connected-react-router"
import axios from 'axios';

const medicinesUrl = process.env.REACT_APP_MEDICINES_URL;

export const fetchMedicines = () => {
    return async(dispatch) => {
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');

        try {
            const response = await axios.get(medicinesUrl, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid
                }
            });
            const medicines = response.data;

            const medicinesList = [];
            const medicinesByName = {};

            console.log('Raw Medicines Response:', response.data); //検証

            medicines.forEach(medicine => {
                medicinesList.push(medicine);
                medicinesByName[medicine.name] = medicine;
            });

            dispatch(fetchMedicinesAction(medicinesList));
            dispatch(setMedicineNamesAction(medicinesByName));
        } catch(error) {
                console.error(' Error Fetch Medicine', error);
        }
    }
}

export const deleteMedicine = (id) => {
    return async(dispatch, getState) => {
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');

        const medicineIdUrl = process.env.REACT_APP_MEDICINES_URL + String(id);

        try {
            await axios.delete(medicineIdUrl, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid
                }
            })
            .then(() => {
            const prevMedicines = getState().medicines.list;
            const nextMedicines = prevMedicines.filter(medicine => medicine.id !== id)
            dispatch(deleteMedicinesAction(nextMedicines))
            dispatch(push('/medicines/index'))
            })
        } catch(error) {
                console.error(' Error Delete Medicine', error);
                alert('処方薬の削除に失敗しました')
        };
    }
}

export const createMedicine = (medicineName, medicineImage, memo, unit,
    ingestionTimesPerDay, ingestionAmountEveryTime, categoryName) => {
    return async(dispatch) => {
        if (medicineName === "") {
            alert("薬名を入力してください");
            return false;
        }
        if (unit === "") {
            alert("単位を選択してください");
            return false;
        }
        if (ingestionTimesPerDay === "") {
            alert("1日の服薬回数を入力してください");
            return false;
        }
        if (ingestionAmountEveryTime === "") {
            alert("1回の服薬量を入力してください");
            return false;
        }
        if (categoryName === "") {
            alert("カテゴリーを選択してください");
            return false;
        }
        if(!medicineImage || !(medicineImage instanceof File)){
            alert("薬の画像が未設定です");
            return false
        }

        try {
            const formData = new FormData();
            formData.append("medicine[name]", medicineName);
            formData.append("medicine[medicine_image]", medicineImage);
            if(memo){
                formData.append("medicine[memo]", memo);
            }
            formData.append("medicine[unit]", unit);
            formData.append("medicine[ingestion_times_per_day]", ingestionTimesPerDay);
            formData.append("medicine[ingestion_amount_every_time]", ingestionAmountEveryTime);
            formData.append("medicine[category_name]", categoryName);

            const  accessToken = localStorage.getItem('access-token'),
                   client = localStorage.getItem('client'),
                   uid = localStorage.getItem('uid');

            await axios.post(medicinesUrl,formData, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid,
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(push('/medicines/index'))
        } catch(error) {
            console.error(' Error Register Medicine', error);
            alert('処方薬の登録に失敗しました')
        }
    }
}

export const updateMedicine = (id, medicineName, medicineImage, memo, unit,
    ingestionTimesPerDay, ingestionAmountEveryTime, categoryName) => {
    return async(dispatch) => {
        if (medicineName === "") {
            alert("薬名を入力してください");
            return false;
        }
        if (unit === "") {
            alert("単位を選択してください");
            return false;
        }
        if (ingestionTimesPerDay === "") {
            alert("1日の服薬回数を入力してください");
            return false;
        }
        if (ingestionAmountEveryTime === "") {
            alert("1回の服薬量を入力してください");
            return false;
        }
        if (categoryName === "") {
            alert("カテゴリーを選択してください");
            return false;
        }
        if(!medicineImage && !(medicineImage instanceof File)){
            alert("薬の画像形式が正しくありません");
            return false
        }

        try {
            const formData = new FormData();
            formData.append("medicine[name]", medicineName);
            if(medicineImage){
                formData.append("medicine[medicine_image]", medicineImage);
            }
            if(memo){
                formData.append("medicine[memo]", memo);
            }
            formData.append("medicine[unit]", unit);
            formData.append("medicine[ingestion_times_per_day]", ingestionTimesPerDay);
            formData.append("medicine[ingestion_amount_every_time]", ingestionAmountEveryTime);
            formData.append("medicine[category_name]", categoryName);

            const  accessToken = localStorage.getItem('access-token'),
                   client = localStorage.getItem('client'),
                   uid = localStorage.getItem('uid');

            const medicineIdUrl = process.env.REACT_APP_MEDICINES_URL + String(id);

            await axios.put(medicineIdUrl, formData, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid,
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(push('/medicines/' + String(id)))
        } catch(error) {
            console.error(' Error Update Medicine', error);
            alert('処方薬の更新に失敗しました')
        }
    }
}
