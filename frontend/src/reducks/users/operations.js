import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import axios from 'axios';

const authUrl = process.env.REACT_APP_AUTH_URL,
      signInUrl = process.env.REACT_APP_SIGN_IN_URL,
      signOutUrl = process.env.REACT_APP_SIGN_OUT_URL,
      editUserUrl = process.env.REACT_APP_EDIT_USER_URL,
      passwordUrl = process.env.REACT_APP_PASSWORD_URL,
      updatePasswordUrl = process.env.REACT_APP_UPDATE_PASSWORD_URL,
      listenAuthStateUrl = process.env.REACT_APP_LISTEN_AUTH_STATE_URL;

export const listenAuthState = () => {
    return async(dispatch) => {
        if(localStorage.getItem('access-token') 
            && localStorage.getItem('client')
            && localStorage.getItem('uid')){
                const  accessToken = localStorage.getItem('access-token'),
                       client = localStorage.getItem('client'),
                       uid = localStorage.getItem('uid');
        
                await axios.get(listenAuthStateUrl, {
                  headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid 
                  }       
                }).then((response) => {
                    dispatch(signInAction({
                        isSignedIn: true,
                        uid: response.data.data.uid,
                        username: response.data.data.name,
                        email: response.data.data.email,
                        image: response.data.data.image
                    }));
                }).catch(error => {
                    console.error(' Error Auth User', error);
                    alert('ユーザ認証に失敗しました')
                });
        } else {
            dispatch(push('/'))
        }
    }                    
}

export const signUp = (username, email, password, confirmPassword) => {
    return async(dispatch) => {
        if (username === "" || email === "" || password === "") {
            alert("必要項目が未入力です");
            return false
        }

        if (password !== confirmPassword) {
            alert("パスワードが一致しません。もう一度お試しください");
            return false
        }

        try {
            const response = await axios.post(authUrl,{
                name: username,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            })

            const accessToken = response.headers['access-token'],
                  client = response.headers['client'],
                  uid = response.headers['uid'];

            localStorage.setItem('access-token', accessToken)
            localStorage.setItem('client', client)
            localStorage.setItem('uid', uid)
            dispatch(push('/'));
        } catch(error) {
            console.error('Can not sign up', error);
            alert('サインアップに失敗しました。もう一度お試しください')
        };
    }
}

export const signIn = (email, password) => {
    return async(dispatch) => {
        if(email === "" || password === "") {
            alert("必要項目が未入力です");
            return false
        }

        try {
            const response = await axios.post(signInUrl,{
                email: email,
                password: password
            });
            if (!localStorage.getItem('access-token') 
                && !localStorage.getItem('client')
                && !localStorage.getItem('uid')) {
                    const accessToken = response.headers['access-token'],
                    client = response.headers['client'],
                    uid = response.headers['uid'];

                    localStorage.setItem('access-token', accessToken)
                    localStorage.setItem('client', client)
                    localStorage.setItem('uid', uid)
            }

            dispatch(signInAction({
                isSignedIn: true,
                uid: response.data.data.uid,
                username: response.data.data.name,
                email: response.data.data.email,
                image: response.data.data.image
            }))
            dispatch(push('/'))
        } catch(error) {
            console.error('Can not sign in', error);
            alert('サインインできませんでした。もう一度お試しください')
        };
    }
}

export const signOut = () => {
    return async(dispatch) => {
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');
        
        await axios.delete(signOutUrl, {
            headers: {
                'access-token': accessToken,
                'client': client,
                'uid': uid 
            }       
        }).then(() => {
            localStorage.clear()
            dispatch(signOutAction())
            dispatch(push('/'))
        }).catch(error => {
            console.error(' Error Sign out', error);
            alert('サインアウトに失敗しました')
        });        
    }
}

export const deleteUser = () => {
    return async(dispatch) => {
        
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');
        
        await axios.delete(authUrl, {
            headers: {
                'access-token': accessToken,
                'client': client,
                'uid': uid
            }        
        }).then(() => {
            localStorage.clear()
            dispatch(signOutAction())
            dispatch(push('/'))          
        }).catch(error => {
            console.error(' Error Sign out', error);
            alert('アカウント削除に失敗しました')
        });
    }
}

export const guestSignIn = () => {
    return async(dispatch) => {
        const username = "ゲストユーザ",
              email = "guest@example.com",
              password = Math.random().toString(36).slice(-8),
              confirmPassword = password;
        
        localStorage.clear()
        dispatch(signOutAction())

        try {
            const response = await axios.post(authUrl,{
                name: username,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            } )

            await axios.post(signInUrl,{
                  email: email,
                  password: password
            });
    
            dispatch(signInAction({
                isSignedIn: true,
                uid: response.data.data.uid,
                username: response.data.data.name,
                email: response.data.data.email,
                image: response.data.data.image
            }))
            dispatch(push('/'))

        } catch(error) {
            console.error('Can not guest sign in', error);
            alert('ゲストサインインできませんでした。もう一度お試しください')
        };
    }
}

export const updateUser = (email, username, image) => {
    return async(dispatch) => {
        if(email === "" || username === "") {
            alert("必要項目が未入力です");
            return false
        }
        if(image === ""){
            alert("アカウント画像が未設定です");
            return false
        }
        try {
            const response = await axios.put(editUserUrl, {
                email: email,
                name: username,
                image: image
            })

            dispatch(signInAction({
                isSignedIn: true,
                uid: response.data.data.uid,
                username: response.data.data.name,
                email: response.data.data.email,
                image: response.data.data.image
            }))
            dispatch(push('/'))

        } catch(error) {
            console.error('Can not update user', error);
            alert('ユーザ情報を更新できませんでした。もう一度お試しください')
        };
    }
}

export const sendPasswordURL = (email) => {
    return async(dispatch) => {
        if(email === "") {
            alert("必要項目が未入力です");
            return false
        }

        try {
            await axios.post(passwordUrl, {
                email: email,
                redirect_url: updatePasswordUrl
            })

            alert("パスワード再設定用リンクをご登録のメールアドレスにお送りしました")
            dispatch(push('/'))

        }catch(error) {
            console.error('Can not send link', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            alert('パスワード再設定用リンクを送信できませんでした。もう一度お試しください')
        };
    }
}

export const updatePassword = (password, confirmPassword) => {
    return async(dispatch) => {
        if(password === "" || confirmPassword === "") {
             alert("必要項目が未入力です");
             return false
         }

         try {
            await axios.put(passwordUrl, {
                password: password,
                password_confirmation: confirmPassword
            })

            dispatch(push('/'))
        
        }catch(error) {
            console.error('Can not reset password', error);
            alert('パスワードを更新できませんでした。もう一度お試しください')
        };
    }
}
