import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { MedicineImageArea } from '../components/Medicine';
import { getCategories } from "../reducks/categories/selectors";
import { fetchCategories } from "../reducks/categories/operations";
import { createMedicine } from "../reducks/medicines/operations";
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const MedicineCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        setMedicineName(event.target.value);
    }, [setMedicineName]);

    const inputMemo = useCallback((event) => {
        setMemo(event.target.value);
    }, [setMemo]);

    const inputIngestionTimesPerDay = useCallback((event) => {
        setIngestionTimesPerDay(event.target.value);
    }, [setIngestionTimesPerDay]);

    const inputIngestionAmountEveryTime = useCallback((event) => {
        setIngestionAmountEveryTime(event.target.value);
    }, [setIngestionAmountEveryTime]);

    const handleCategoryChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

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

    const handleCreateMedicine = () => {
        dispatch(createMedicine(medicineName, medicineImage, memo, unit, ingestionTimesPerDay, ingestionAmountEveryTime, categoryName));
        navigate('/medicines/index');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>薬を登録</Typography>
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
                    onChange={inputIngestionAmountEveryTime} rows={1} value={ingestionAmountEveryTime} type={"number"}
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
                <Box sx={{ mt: 3 }}>
                    <PrimaryButton
                        label={"薬を登録"}
                        onClick={handleCreateMedicine}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default MedicineCreate;
