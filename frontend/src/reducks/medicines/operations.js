import { deletemedicinesAction, fetchmedicinesAction } from "./actions";
import { push } from "connected-react-router"
import axios from 'axios';

export const fetchMedicines = () => {
    return async(dispatch) => {
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');

        try {
            const response = await axios.get(medicineIndexUrl, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid
                }
            });
            const medicinesList = response.data;
            dispatch(fetchmedicinesAction(medicinesList));
        } catch(error) {
                console.error(' Error Fetch Medicine', error);
                alert('登録された処方薬の一括取得に失敗しました')
        }
    }
}

export const deleteMedicine = (id) => {
    return async(dispatch, getState) => {
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');

        try {
            await axios.delete(medicineIndexUrl, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid
                }
            })
            .then(() => {
            const prevMedicines = getState().medicines.list;
            const nextMedicines = prevMedicines.filter(medicine => medicine.id !== id)
            dispatch(deletemedicinesAction(nextMedicines))
            dispatch(push('/medicines/index'))
            })
        } catch(error) {
                console.error(' Error Delete Medicine', error);
                alert('処方薬の削除に失敗しました')
        };
    }
}

export const createMedicine = (medicineName, medicineImage, memo,
    ingestionTimesPerDay, ingestionAmountPerDay, categoryName) => {
    return async(dispatch) => {
        if(medicineName === "" || memo === "" ||
            ingestionTimesPerDay === "" ||
            ingestionAmountPerDay === "" ||
            categoryName === "") {
            alert("必要項目が未入力です");
            return false
        }
        if(!medicineImage || !(medicineImage instanceof File)){
            alert("薬の画像が未設定です");
            return false
        }

        try {
            const formData = new FormData();
            formData.append("name", medicineName);
            formData.append("medicine_image", medicineImage);
            formData.append("memo", memo);
            formData.append("ingestion_times_per_day", ingestionTimesPerDay);
            formData.append("ingestion_amount_per_day", ingestionAmountPerDay);
            formData.append("category_name", categoryName);

            const  accessToken = localStorage.getItem('access-token'),
                   client = localStorage.getItem('client'),
                   uid = localStorage.getItem('uid');

            await axios.get(CategoryIndexUrl,formData, {
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

export const updateMedicine = (medicineName, medicineImage, memo,
    ingestionTimesPerDay, ingestionAmountPerDay, categoryName) => {
    return async(dispatch) => {
        if(medicineName === "" || memo === "" ||
            ingestionTimesPerDay === "" ||
            ingestionAmountPerDay === "" ||
            categoryName === "") {
            alert("必要項目が未入力です");
            return false
        }
        if(!medicineImage && !(medicineImage instanceof File)){
            alert("薬の画像形式が正しくありません");
            return false
        }

        try {
            const formData = new FormData();
            formData.append("name", medicineName);
            if(medicineImage){
                formData.append("medicine_image", medicineImage);
            }
            formData.append("memo", memo);
            formData.append("ingestion_times_per_day", ingestionTimesPerDay);
            formData.append("ingestion_amount_per_day", ingestionAmountPerDay);
            formData.append("category_name", categoryName);

            const  accessToken = localStorage.getItem('access-token'),
                   client = localStorage.getItem('client'),
                   uid = localStorage.getItem('uid');

            await axios.post(`${medicineUpdateUrl}/${medicineId}`,formData, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid,
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(push('/medicine/detail'))
        } catch(error) {
            console.error(' Error Update Medicine', error);
            alert('処方薬の更新に失敗しました')
        }
    }
}
