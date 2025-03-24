import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { updatePassword } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const UpdatePassword = () => {
    const dispatch = useDispatch();

    const [password, setPassword] = useState(""),
          [confirmPassword, setComfirmPassword] = useState("");

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword]);
    
    const inputConfirmPassword = useCallback((event) => {
        setComfirmPassword(event.target.value)
    }, [setComfirmPassword]);

    return (
        <>
          <h2>パスワードを更新</h2>
          <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
          />
          <TextInput
                fullWidth={true} label={"パスワード（再確認）"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
          />
          <PrimaryButton
              label={"パスワードを更新"}
              onClick={() => dispatch(updatePassword(password,confirmPassword))}
          />
        </>
    )
}
export default UpdatePassword;
