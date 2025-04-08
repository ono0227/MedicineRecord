import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../UIkit";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const InquiryForm = () => {
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value);
    }, [setDescription]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const inputUserName = useCallback((event) => {
        setUserName(event.target.value);
    }, [setUserName]);

    //メールアドレスの書式をチェックする関数
    const validateEmailFormat = (email) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
    };

    //必須入力欄が空白かどうかをチェックする関数
    const validateRequiredInput = (...args) => {
        return args.some(arg => arg === "");
    };

    const submitForm = () => {
        const isBlank = validateRequiredInput(username, email, description);
        const isValidEmail = validateEmailFormat(email);

        if (isBlank) {
            alert('必須入力欄が空白です。');
            return false;
        } else if (!isValidEmail) {
            alert('メールアドレスの書式が異なります。');
            return false;
        } else {
            const payload = {
            text: 'お問い合わせがありました\n'
                + 'お名前: ' + username + '\n'
                + 'メールアドレス: ' + email + '\n'
                + '【問い合わせ内容】\n' + description
        };

        const webhookUrl = process.env.REACT_APP_WEBHOOK_URL;

        //fetchメソッドでフォームの内容をSlackのIncoming Webhook URL に送信する
        fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました。追ってご連絡いたします🙌');
            setDescription("")
            setEmail("")
            setUserName("")

        })}
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5" gutterBottom>
                    お問い合わせフォーム
                </Typography>
                <Box sx={{ mt: 3, width: '100%' }}>
                    <TextInput
                        label={"名前(必須)"} multiline={false} rows={1}
                        value={username} type={"text"} onChange={inputUserName}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextInput
                        label={"メールアドレス(必須)"} multiline={false} rows={1}
                        value={email} type={"email"} onChange={inputEmail}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextInput
                        label={"お問い合わせ内容(必須)"} multiline={true} rows={5}
                        value={description} type={"text"} onChange={inputDescription}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <PrimaryButton
                        label="送信する"
                        onClick={submitForm} color="primary"
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default InquiryForm;
