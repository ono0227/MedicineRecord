import React, { useState, useCallback, useEffect } from "react";
import { TextInput, PrimaryButton, ImageArea } from "../components/UIkit";
import { listenAuthState, updateUser } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const UserEdit = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(""),
          [email, setEmail] = useState(""),
          [image, setImage] = useState("");
    
    
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    }, [setUsername]);
    
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    useEffect(() => {
        dispatch(listenAuthState)
    }, [dispatch])

    return (
        <>
           <h2>ユーザ情報の編集</h2>
           <ImageArea image={image} setImage={setImage} />
           
           <TextInput
               fullWidth={true} label={"ユーザ名"} multiline={false} required={true}
               rows={1} value={username} type={"text"} onChange={inputUsername}
           />
          <TextInput
              fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
              rows={1} value={email} type={"email"} onChange={inputEmail}
          />
          <PrimaryButton
              label={"ユーザ情報を保存"}
              onClick={() => dispatch(updateUser(image, username, email))}
          />
          <p onClick={() => dispatch(push('/user/:id'))}>戻る</p>
        </>
    )
}

export default UserEdit;
