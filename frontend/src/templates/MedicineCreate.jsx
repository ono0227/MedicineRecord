import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import MedicineImageArea from '../components/Medicine/MedicineImageArea';
import { getCategories } from "../reducks/categories/selectors"; // 新しい selector をインポート
import { fetchCategories } from "../reducks/categories/operations"; // 新しいオペレーションをインポート
import { createMedicine } from "../reducks/medicines/operations";

const MedicineCreate = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)

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

    const inputIngestionAmountEveryTime = useCallback((event) => {
        setIngestionAmountEveryTime(event.target.value)
    }, [setIngestionAmountEveryTime])

    useEffect(() => {
        dispatch(fetchCategories());
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

    return (
        <div>
            <h2>薬を作成する</h2>
            <section>
                <h2 className="u-text_headline u-text-center">薬の登録</h2>
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
                        onChange={inputIngestionAmountEveryTime} rows={1} value={ingestionAmountEveryTime} type={"number"}
                    />

                    <SelectBox
                        label={"単位"} required={true} options={unitOptions} select={setUnit} value={unit}
                    />

                    <div className="module-spacer--small"/>
                    <div className="center">
                        <PrimaryButton
                            label={"薬を登録"}
                            onClick={() => dispatch(createMedicine(medicineName, medicineImage, memo, unit, ingestionTimesPerDay, ingestionAmountEveryTime, categoryName))}
                        />
                    </div>
                </div>
            </section>
    </div>
    );
};

export default MedicineCreate;
