import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { updateMedicine, fetchMedicines } from "../reducks/medicines/operations"
import { MedicineImageArea } from "../components/Medicine";
import { getMedicines } from "../reducks/medicines/selectors";
import { getCategories } from "../reducks/categories/selectors";
import { fetchCategories } from "../reducks/categories/operations";
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const MedicineEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const selector = useSelector((state) => state)
    const medicines = getMedicines(selector);
    const categories = getCategories(selector);

    const [medicineName, setMedicineName] = useState("");
    const [medicineImage, setMedicineImage] = useState("");
    const [memo, setMemo] = useState("");
    const [unit, setUnit] = useState("");
    const [ingestionTimesPerDay, setIngestionTimesPerDay] = useState("");
    const [ingestionAmountEveryTime, setIngestionAmountEveryTime] = useState("");
    const [categoryName, setCategoryName] = useState("");

    const inputMedicineName = useCallback((event) => {
        setMedicineName(event.target.value);
    }, [setMedicineName]);

    const inputMemo = useCallback((event) => {
        setMemo(event.target.value);
    }, [setMemo]);

    const inputIngestionTimesPerDay = useCallback((event) => {
        setIngestionTimesPerDay(event.target.value);
    }, [setIngestionTimesPerDay]);

    const inputIngestionAmountPerDay = useCallback((event) => {
        setIngestionAmountEveryTime(event.target.value);
    }, [setIngestionAmountEveryTime]);

    const handleCategoryChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchMedicines());
        dispatch(fetchCategories());
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
            setMedicineImage(targetMedicine.medicine_image || "");
        }
    }, [id, medicines, setMedicineName, setMemo, setIngestionTimesPerDay, setIngestionAmountEveryTime, setCategoryName]);

    const categoryOptions = categories ? categories.map((category) => (
        <MenuItem key={category.id} value={category.name}>
            {category.name}
        </MenuItem>
    )) : [];

    const unitOptions = [
        <MenuItem key="g" value="g">g</MenuItem>,
        <MenuItem key="mg" value="mg">mg</MenuItem>,
        <MenuItem key="錠" value="錠">錠</MenuItem>,
        <MenuItem key="枚" value="枚">枚</MenuItem>,
        <MenuItem key="ml" value="ml">ml</MenuItem>
    ];

    const handleUpdateMedicine = () => {
        dispatch(updateMedicine(id, medicineName, medicineImage, memo, unit, ingestionTimesPerDay, ingestionAmountEveryTime, categoryName));
        navigate(`/medicines/${id}`);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>薬の編集</Typography>
                <MedicineImageArea medicineImage={medicineImage} setMedicineImage={setMedicineImage}/>
                <TextInput
                    fullWidth label={"薬名"} multiline={false} required={true}
                    onChange={inputMedicineName} rows={1} value={medicineName} type={"text"}
                    sx={{ mt: 2 }}
                />
                <TextInput
                    fullWidth label={"メモ"} multiline={true} required={false}
                    onChange={inputMemo} rows={5} value={memo} type={"text"}
                    sx={{ mt: 2 }}
                />
                <FormControl fullWidth required sx={{ mt: 2 }}>
                    <InputLabel id="category-label">カテゴリー</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        value={categoryName}
                        label="カテゴリー"
                        onChange={handleCategoryChange}
                    >
                        {categoryOptions}
                    </Select>
                </FormControl>
                <TextInput
                    fullWidth label={"1日の服薬回数"} multiline={false} required={true}
                    onChange={inputIngestionTimesPerDay} rows={1} value={ingestionTimesPerDay} type={"number"}
                    sx={{ mt: 2 }}
                />
                <TextInput
                    fullWidth label={"1回の服薬量"} multiline={false} required={true}
                    onChange={inputIngestionAmountPerDay} rows={1} value={ingestionAmountEveryTime} type={"number"}
                    sx={{ mt: 2 }}
                />
                <FormControl fullWidth required sx={{ mt: 2 }}>
                    <InputLabel id="unit-label">単位</InputLabel>
                    <Select
                        labelId="unit-label"
                        id="unit"
                        value={unit}
                        label="単位"
                        onChange={handleUnitChange}
                    >
                        {unitOptions}
                    </Select>
                </FormControl>
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <PrimaryButton
                        label={"薬を更新"}
                        onClick={handleUpdateMedicine}
                        sx={{ mb: 1 }}
                    />
                    <Typography sx={{ mt: 1, cursor: 'pointer' }} onClick={() => navigate(`/medicines/${id}`)}>
                        戻る
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default MedicineEdit;
