import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { guestSignIn } from "../reducks/users/operations";
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material";
import Container from '@mui/material/Container';

const TopPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGuestSignIn = () => {
        dispatch(guestSignIn());
        navigate('/timeline');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" gutterBottom>あなたの服薬をサポート！</Typography>
                <Typography variant="subtitle2" gutterBottom>無料アプリ</Typography>
                <Typography variant="h3" gutterBottom>Medicine Record</Typography>
                <Typography variant="body1" gutterBottom>手軽な服薬記録を通じて、あなたの闘病生活をサポートします！</Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>Medicine Recordとは</Typography>
                <Typography variant="body1" gutterBottom>パソコンやスマホで簡単に服薬継続をサポートするアプリです。</Typography>
                <Typography variant="body1" gutterBottom>投薬記録をグラフ化、スケジュール化することでこれまでの積み上げを確認できます。</Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={6}>
                        <Typography variant="body1" gutterBottom>パソコンやスマホからペーパーレスで利用可能！</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="body1" gutterBottom>服薬記録をグラフやスケジュールでわかりやすく視覚化！</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="body1" gutterBottom>服薬継続日数を表示しモチベアップ！</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="body1" gutterBottom>現代風のデザインで楽しく継続できる！</Typography>
                    </Grid>
                </Grid>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body1" gutterBottom>まずはワンクリックで無料登録！</Typography>
                <Typography
                    component="p"
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                    onClick={handleGuestSignIn}
                >
                    ユーザ登録なしで利用！
                </Typography>
            </Box>
        </Box>
    </Container>
    )
}

export default TopPage;
