import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { updateMedicine, fetchMedicines } from "../reducks/medicines/operations"
import { MedicineImageArea } from "../components/Medicine";
import { getMedicines } from "../reducks/medicines/selectors";
import { getCategories } from "../reducks/categories/selectors";
import { fetchCategories } from "../reducks/categories/operations";
import { push } from "connected-react-router";

const MedicineEdit = () => {
    const dispatch = useDispatch();

    const selector = useSelector((state) => state)
    const path = selector.router.location.pathname
    const id = path.split('/medicines/edit/')[1]

    const medicines = getMedicines(selector);
    const categories = getCategories(selector);

    const [medicineName, setMedicineName] = useState(""),
          [medicineImage, setMedicineImage] = useState(""),
          [memo, setMemo] = useState(""),
          [unit, setUnit] = useState(""),
          [ingestionTimesPerDay, setIngestionTimesPerDay] = useState(""),
          [ingestionAmountEveryTime, setIngestionAmountEveryTime] = useState(""),
          [categoryName, setCategoryName] = useState("");

    const inputMedicineName = useCallback((event) => {
        setMedicineName(event.target.value)
    }, [setMedicineName])

    const inputMemo = useCallback((event) => {
        setMemo(event.target.value)
    }, [setMemo])

    const inputIngestionTimesPerDay = useCallback((event) => {
        setIngestionTimesPerDay(event.target.value)
    }, [setIngestionTimesPerDay])

    const inputIngestionAmountPerDay = useCallback((event) => {
        setIngestionAmountEveryTime(event.target.value)
    }, [setIngestionAmountEveryTime])

    useEffect(() => {
        dispatch(fetchMedicines())
    }, [dispatch]);

    useEffect(() => {
        const targetMedicine = medicines.find(medicine => String(medicine.id) === id);
        if (targetMedicine) {
            setMedicineName(targetMedicine.name);
            setMemo(targetMedicine.memo);
            setUnit(targetMedicine.unit);
            setIngestionTimesPerDay(String(targetMedicine.ingestion_times_per_day));
            setIngestionAmountEveryTime(String(targetMedicine.ingestion_amount_every_time));
            setCategoryName(targetMedicine.category_name);
        }
    }, [id, medicines, setMedicineName, setMemo, setIngestionTimesPerDay, setIngestionAmountEveryTime, setCategoryName]);

    useEffect(() => {
            dispatch(fetchCategories()); // enum の値をフェッチ
    }, [dispatch]);

    const categoryOptions = categories ? categories.map((category) => ({
        label: category.name,
        value: category.name,
        key: category.id
    })) : [];

    const unitOptions = [
        { label: 'g', value: 'g', key: 'g' },
        { label: 'mg', value: 'mg', key: 'mg' },
        { label: '錠', value: '錠', key: '錠' },
        { label: '枚', value: '枚', key: '枚' },
        { label: 'ml', value: 'ml', key: 'ml' }
    ];

    return(
        <section>
            <h2 className="u-text_headline u-text-center">薬の編集</h2>
            <div className="c-section-container">
                <MedicineImageArea medicineImage={medicineImage} setMedicineImage={setMedicineImage} />
                <TextInput
                    fullWidth={true} label={"薬名"} multiline={false} required={true}
                    onChange={inputMedicineName} rows={1} value={medicineName} type={"text"}
                />

                <TextInput
                    fullWidth={true} label={"メモ"} multiline={true} required={false}
                    onChange={inputMemo} rows={5} value={memo} type={"text"}
                />

                <SelectBox
                    label={"カテゴリー"} required={true} options={categoryOptions} select={setCategoryName} value={categoryName}
                />

                <TextInput
                    fullWidth={true} label={"1日の服薬回数"} multiline={false} required={true}
                    onChange={inputIngestionTimesPerDay} rows={1} value={ingestionTimesPerDay} type={"number"}
                />

                <TextInput
                    fullWidth={true} label={"1回の服薬量"} multiline={false} required={true}
                    onChange={inputIngestionAmountPerDay} rows={1} value={ingestionAmountEveryTime} type={"number"}
                />

                <SelectBox
                    label={"単位"} required={true} options={unitOptions} select={setUnit} value={unit}
                />

                <div className="module-spacer--small"/>
                <div className="center">
                    <PrimaryButton
                        label={"薬を更新"}
                        onClick={() => dispatch(updateMedicine(id, medicineName, medicineImage, memo, unit, ingestionTimesPerDay, ingestionAmountEveryTime, categoryName))}
                    />
                    <div className="module-spacer--medium"/>
                    <p onClick={() => dispatch(push('/medicines/'+ id))}>戻る</p>
                </div>
            </div>
        </section>
    )
}

export default MedicineEdit
