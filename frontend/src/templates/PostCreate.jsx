import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines, getMedicineNames } from "../reducks/medicines/selectors";
import { fetchMedicines } from "../reducks/medicines/operations";
import { createPost } from "../reducks/posts/operations";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { styled } from '@mui/material/styles';
import { NavigateTabs } from "../components/UIkit";
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StyledSelect = styled(Select)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
}));

const PostCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentTabUrl, setCurrentTabUrl] = useState(location.pathname);
    const selector = useSelector((state) => state);

    const medicines = getMedicines(selector),
          medicineNames = getMedicineNames(selector);

    const handleTabChange = (newUrl) => {
        setCurrentTabUrl(newUrl);
    };

    //tabリストを作成
    const tabConfig = [
        { index: 0, label: 'タイムライン', value: '/timeline' },
        { index: 1, label: 'カレンダー', value: '/calendar' },
        { index: 2, label: 'グラフ', value: '/bargraph' },
        { index: 3, label: '記録', value: '/posts/create' },
        { index: 4, label: '薬一覧', value: '/medicines/index' },
    ];

    const [medicineName, setMedicineName] = useState(""),
          [medicineImage, setMedicineImage] = useState(""),
          [ingestionAmount, setIngestionAmount] = useState(""),
          [comment, setComment] = useState("");

    const inputIngestionAmount = useCallback((event) => {
        setIngestionAmount(event.target.value);
    }, [setIngestionAmount]);

    const inputComment = useCallback((event) => {
        setComment(event.target.value);
    }, [setComment]);

    const handleMedicineNameChange = useCallback((event) => {
        const name = event.target.value;
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

    const handleCreatePost = () => {
        dispatch(createPost(ingestionAmount, comment, medicineName, medicineImage));
        navigate('/timeline');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>服薬状況を記録</Typography>
                <StyledSelect
                    labelId="medicine-name-label"
                    id="medicine-name"
                    value={medicineName}
                    label={"薬の名前"}
                    onChange={handleMedicineNameChange}
                    required
                >
                    {medicineOptions.map((option) => (
                        <MenuItem key={option.key} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </StyledSelect>
                {medicineImage && (
                    <div>
                        <img src={medicineImage} alt={medicineName} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div>
                )}
                <TextInput
                    fullWidth label={"服薬量"} multiline={false} required={true}
                    onChange={inputIngestionAmount} rows={1} value={ingestionAmount} type={"number"}
                    sx={{ mt: 2 }}
                />
                <TextInput
                    fullWidth label={"コメント"} multiline={true} required={false}
                    onChange={inputComment} rows={5} value={comment} type={"text"}
                    sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 3 }}>
                    <PrimaryButton
                        label={"服薬状況を投稿"}
                        onClick={handleCreatePost}
                    />
                </Box>
                <NavigateTabs
                    tabConfig={tabConfig}
                    value={currentTabUrl}
                    onChange={handleTabChange}
                />
            </Box>
        </Container>
    );
};

export default PostCreate;
