import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState(""),
          [password, setPassword] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const handleSignIn = () => {
        dispatch(signIn(email, password));
        navigate('/timeline');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    サインイン
                </Typography>
                <Box sx={{ mt: 3, width: '100%' }}>
                    <TextInput
                        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                        rows={1} value={email} type={"email"} onChange={inputEmail}
                    />
                    <TextInput
                        fullWidth={true} label={"パスワード"} multiline={false} required={true}
                        rows={1} value={password} type={"password"} onChange={inputPassword}
                    />
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <PrimaryButton
                            label={"サインイン"}
                            onClick={handleSignIn}
                        />
                        <Typography sx={{ mt: 1, cursor: 'pointer' }} onClick={() => navigate('/signup')}>
                            アカウントをお持ちでない方はこちら
                        </Typography>
                        <Typography sx={{ mt: 1, cursor: 'pointer' }} onClick={() => navigate('/password/reset')}>
                            パスワードを忘れた方はこちら
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
