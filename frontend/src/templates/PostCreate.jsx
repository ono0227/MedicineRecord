import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput, SelectBox } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines, getMedicineNames } from "../reducks/medicines/selectors";
import { fetchMedicines } from "../reducks/medicines/operations";
import { createPost } from "../reducks/posts/operations";

const PostCreate = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)

    const medicines = getMedicines(selector),
          medicineNames = getMedicineNames(selector);

    const [medicineName, setMedicineName] = useState(""),
          [medicineImage, setMedicineImage] = useState(""),
          [ingestionAmount, setIngestionAmount] = useState(""),
          [comment, setComment] = useState("");

    const inputIngestionAmount = useCallback((event) => {
        setIngestionAmount(event.target.value)
    }, [setIngestionAmount])

    const inputComment = useCallback((event) => {
        setComment(event.target.value)
    }, [setComment])

    const handleMedicineNameChange = useCallback((name) => {
        setMedicineName(name);
        if (medicineNames && medicineNames[name] && medicineNames[name].medicine_image) {
            setMedicineImage(medicineNames[name].medicine_image);
        } else {
            setMedicineImage("");
        }
    }, [medicineNames, setMedicineName, setMedicineImage]);

    useEffect(() => {
        dispatch(fetchMedicines());
    }, [dispatch]);

    const medicineOptions = medicines.map((medicine, index) => ({
        label: medicine.name,
        value: medicine.name,
        key: index
    }));

    return (
      <div>
        <h2>服薬状況を記録する</h2>
            <section>
                <h2 className="u-text_headline u-text-center">服薬状況を記録</h2>
                <div className="c-section-container">
                    <SelectBox
                        label={"薬の名前"} required={true}
                        options={medicineOptions}
                        select={handleMedicineNameChange}
                        value={medicineName}
                    />
                    {medicineImage && (
                        <div>
                            <img src={medicineImage} alt={medicineName} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </div>
                    )}
                    <TextInput
                        fullWidth={true} label={"服薬量"} multiline={false} required={true}
                        onChange={inputIngestionAmount} rows={1} value={ingestionAmount} type={"text"}
                    />

                    <TextInput
                        fullWidth={true} label={"コメント"} multiline={true} required={false}
                        onChange={inputComment} rows={5} value={comment} type={"text"}
                    />

                    <div className="module-spacer--small"/>
                    <div className="center">
                        <PrimaryButton
                            label={"服薬状況を投稿"}
                            onClick={() => dispatch(createPost(ingestionAmount, comment, medicineName, medicineImage))}
                        />
                    </div>
                </div>
            </section>
      </div>
    );
};

export default PostCreate;
