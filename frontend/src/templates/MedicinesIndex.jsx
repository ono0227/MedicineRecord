import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicines } from "../reducks/medicines/operations";
import { getMedicines } from "../reducks/medicines/selectors";
import { MedicineSummary } from "../components/Medicine";
import { push } from "connected-react-router";

const MedicinesIndex = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const medicines = getMedicines(selector);

    useEffect(() => {
        dispatch(fetchMedicines())
    }, [dispatch]);

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {medicines && medicines.length > 0 ? ( // medicines が存在し、かつ要素がある場合のみ map を実行
                    medicines.map(medicine => (
                        <MedicineSummary
                            key={medicine.id} id={medicine.id}
                            medicineName={medicine.name}
                            medicineImage={medicine.medicine_image}
                            categoryName={medicine.category_name}
                        />
                    ))
                ) : (
                    <p>薬の情報がありません</p>
                )}
                <div className="center">
                    <p onClick={() => dispatch(push('/medicines/create'))}>薬を登録する</p>
                </div>
            </div>
        </section>
    )
};

export default MedicinesIndex;
