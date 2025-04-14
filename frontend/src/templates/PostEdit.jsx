import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, fetchPosts } from "../reducks/posts/operations";
import { getPosts } from "../reducks/posts/selectors";
import { Paper, Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

const EditPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const PostEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const selector = useSelector((state) => state);
    const posts = getPosts(selector);

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

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        const targetPost = posts.find(post => String(post.id) === id);
        if (targetPost) {
            setMedicineName(targetPost.medicine.name);
            setMedicineImage(targetPost.medicine.medicine_image);
            setIngestionAmount(String(targetPost.ingestion_amount));
            setComment(targetPost.comment);
        }
    }, [id, posts, setMedicineName, setMedicineImage, setIngestionAmount, setComment]);

    const handleUpdatePost = () => {
        dispatch(updatePost(id, ingestionAmount, comment, medicineName, medicineImage));
        navigate(`/posts/${id}`);
    };

    return (
        <section>
            <Typography variant="h6" component="h2" align="center" gutterBottom>
                投薬記録の編集
            </Typography>
            <Container maxWidth="sm">
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <EditPaper>
                            {medicineImage && (
                                <img
                                    src={medicineImage}
                                    alt="薬の画像"
                                    style={{ maxWidth: '100%', marginBottom: '16px' }}
                                />
                            )}
                            <Typography variant="subtitle1" gutterBottom>
                                薬の名前：{medicineName}
                            </Typography>

                            <TextInput
                                fullWidth label={"服薬量"} multiline={false} required={true}
                                onChange={inputIngestionAmount} rows={1} value={ingestionAmount} type={"number"}
                                sx={{ mb: 2 }}
                            />

                            <TextInput
                                fullWidth label={"コメント"} multiline={true} required={false}
                                onChange={inputComment} rows={5} value={comment} type={"text"}
                                sx={{ mb: 2 }}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                                <PrimaryButton
                                    label={"投薬記録を更新"}
                                    onClick={handleUpdatePost}
                                    sx={{ mb: 1 }}
                                />
                                <Typography
                                    component="p"
                                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                                    onClick={() => navigate(`/posts/${id}`)}
                                >
                                    戻る
                                </Typography>
                            </Box>
                        </EditPaper>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default PostEdit;
