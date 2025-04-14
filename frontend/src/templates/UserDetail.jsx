import React, { useCallback } from "react";
import { PrimaryButton } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../reducks/users/operations";
import { getEmail, getUserId, getUserImage, getUserName } from "../reducks/users/selectors";
import { styled } from "@mui/material/styles";
import guestUserImage from "../assets/img/guest_user_image.png";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const UserDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selector = useSelector((state) => state);
    const username = getUserName(selector),
          userimage = getUserImage(selector),
          email = getEmail(selector),
          userid = getUserId(selector);

    const hasUserimage = useCallback(() => {
        return username === "ゲストユーザ" ||
            (username !== "ゲストユーザ" &&
                userimage === "");
    }, [username, userimage]);

    const handleDeleteUser = () => {
        dispatch(deleteUser());
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5" gutterBottom>
                    ユーザ設定
                </Typography>
                {userid && (
                    <StyledPaper sx={{ width: '100%', mt: 2 }}>
                        <Grid container spacing={2} direction="column" alignItems="center">
                            <Grid item>
                                <Avatar
                                    alt={username}
                                    src={hasUserimage() ? guestUserImage : userimage}
                                    sx={{ width: 80, height: 80 }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">ユーザ名：{username}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2" color="textSecondary">登録されたメールアドレス：{email}</Typography>
                            </Grid>
                            <Grid item sx={{ mt: 2 }}>
                                <PrimaryButton
                                    label={"ユーザ情報を編集"}
                                    onClick={() => navigate('/users/edit')}
                                />
                            </Grid>
                            <Grid item>
                                <PrimaryButton
                                    label={"退会する"}
                                    onClick={handleDeleteUser}
                                    color="error"
                                />
                            </Grid>
                        </Grid>
                    </StyledPaper>
                )}
            </Box>
        </Container>
    );
};

export default UserDetail;
