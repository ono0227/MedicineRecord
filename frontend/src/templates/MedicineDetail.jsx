import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import { PrimaryButton } from '../components/UIkit';
import { getMedicines } from "../reducks/medicines/selectors";
import {returnCodeToBr} from "../helper";
import { push } from 'connected-react-router';
import { deleteMedicine, fetchMedicines } from '../reducks/medicines/operations';

const useStyles = makeStyles((theme) => ({
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        },
    },
}))

const MedicineDetail = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const path = selector.router.location.pathname
    const id = path.split('/medicines/')[1]

    const medicines = getMedicines(selector);

    const [medicineName, setMedicineName] = useState(""),
          [medicineImage, setMedicineImage] = useState(""),
          [memo, setMemo] = useState(""),
          [unit, setUnit] = useState(""),
          [ingestionTimesPerDay, setIngestionTimesPerDay] = useState(""),
          [ingestionAmountEveryTime, setIngestionAmountEveryTime] = useState(""),
          [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        dispatch(fetchMedicines())
    }, [dispatch]);

     useEffect(() => {
        const targetMedicine = medicines.find(medicine => String(medicine.id) === id);
            if (targetMedicine) {
                setMedicineName(targetMedicine.name);
                setMedicineImage(targetMedicine.medicine_image)
                setMemo(targetMedicine.memo);
                setUnit(targetMedicine.unit);
                setIngestionTimesPerDay(String(targetMedicine.ingestion_times_per_day));
                setIngestionAmountEveryTime(String(targetMedicine.ingestion_amount_every_time));
                setCategoryName(targetMedicine.category_name);
            }
        }, [id, medicines, setMedicineName, setMemo, setUnit, setIngestionTimesPerDay, setIngestionAmountEveryTime, setCategoryName]);

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                <img src={medicineImage} alt="薬の画像"/>
                <div className={classes.detail}>
                    <h2 className="u-text__headline">薬の名前：{medicineName}</h2>
                    <p>カテゴリー名：{categoryName}</p>
                    <p>1日の服薬回数：{ingestionTimesPerDay}</p>
                    <p>1回の服薬量：{ingestionAmountEveryTime}</p>
                    <p>単位：{unit}</p>
                    <div className="module-spacer--small"/>
                    <p>メモ：{returnCodeToBr(memo)}</p>
                </div>
                <div className="module-spacer--small"/>
                <div className="center">
                    <PrimaryButton
                        label={"薬情報を編集"}
                        onClick={() => dispatch(push('/medicines/edit/' + String(id)))}
                    />
                    <div className="module-spacer--medium"/>
                    <PrimaryButton
                        label={"薬情報を削除"}
                        onClick={() => dispatch(deleteMedicine(id))}
                    />
                    </div>
                </div>
        </section>
    );
};

export default MedicineDetail;
