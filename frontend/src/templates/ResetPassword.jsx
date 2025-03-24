import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { sendPasswordURL } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])

    return (
        <>
          <h2>パスワード再設定の手続き</h2>
          <TextInput
              fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
              rows={1} value={email} type={"email"} onChange={inputEmail}
          />
          <PrimaryButton
              label={"パスワード再設定用のURLを送信"}
              onClick={() => dispatch(sendPasswordURL(email))}
          />
          <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
        </>
    )
}

export default ResetPassword;
