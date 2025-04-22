import axios from 'axios'
import { signInAction, signOutAction } from './actions'

const authUrl = process.env.REACT_APP_AUTH_URL,
  signInUrl = process.env.REACT_APP_SIGN_IN_URL,
  signOutUrl = process.env.REACT_APP_SIGN_OUT_URL,
  passwordUrl = process.env.REACT_APP_PASSWORD_URL,
  updatePasswordUrl = process.env.REACT_APP_UPDATE_PASSWORD_URL,
  listenAuthStateUrl = process.env.REACT_APP_LISTEN_AUTH_STATE_URL

export const listenAuthState = () => {
  return async (dispatch) => {
    if (localStorage.getItem('access-token') && localStorage.getItem('client') && localStorage.getItem('uid')) {
      const accessToken = localStorage.getItem('access-token'),
        client = localStorage.getItem('client'),
        uid = localStorage.getItem('uid')

      await axios
        .get(listenAuthStateUrl, {
          headers: {
            'access-token': accessToken,
            client: client,
            uid: uid,
          },
        })
        .then((response) => {
          dispatch(
            signInAction({
              isSignedIn: true,
              uid: response.data.data.uid,
              username: response.data.data.name,
              email: response.data.data.email,
              userimage: response.data.data.image,
            }),
          )
        })
        .catch((error) => {
          console.error(' Error Auth User', error)
          alert('ユーザ認証に失敗しました')
        })
    } else {
      dispatch(signOutAction())
    }
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (username === '') {
      alert('ユーザ名を入力してください')
      return false
    }
    if (email === '') {
      alert('メールアドレスを入力してください')
      return false
    }
    if (password === '') {
      alert('パスワードを入力してください')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度お試しください')
      return false
    }

    try {
      const response = await axios.post(authUrl, {
        name: username,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      })

      const accessToken = response.headers['access-token'],
        client = response.headers['client'],
        uid = response.headers['uid']

      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('client', client)
      localStorage.setItem('uid', uid)
    } catch (error) {
      console.error('Can not sign up', error)
      alert('サインアップに失敗しました。もう一度お試しください')
    }
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === '') {
      alert('メールアドレスを入力してください')
      return false
    }
    if (password === '') {
      alert('パスワードを入力してください')
      return false
    }

    localStorage.clear()
    dispatch(signOutAction())

    try {
      const response = await axios.post(signInUrl, {
        email: email,
        password: password,
      })

      const accessToken = response.headers['access-token'],
        client = response.headers['client'],
        uid = response.headers['uid']

      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('client', client)
      localStorage.setItem('uid', uid)

      dispatch(
        signInAction({
          isSignedIn: true,
          uid: response.data.data.uid,
          username: response.data.data.name,
          email: response.data.data.email,
          userimage: response.data.data.image,
        }),
      )
    } catch (error) {
      console.error('Can not sign in', error)
      alert('サインインできませんでした。もう一度お試しください')
    }
  }
}

export const signOut = () => {
  return async (dispatch) => {
    const accessToken = localStorage.getItem('access-token'),
      client = localStorage.getItem('client'),
      uid = localStorage.getItem('uid')

    await axios
      .delete(signOutUrl, {
        headers: {
          'access-token': accessToken,
          client: client,
          uid: uid,
        },
      })
      .then(() => {
        localStorage.clear()
        dispatch(signOutAction())
      })
      .catch((error) => {
        console.error(' Error Sign out', error)
        alert('サインアウトに失敗しました')
      })
  }
}

export const deleteUser = () => {
  return async (dispatch) => {
    const accessToken = localStorage.getItem('access-token'),
      client = localStorage.getItem('client'),
      uid = localStorage.getItem('uid')

    await axios
      .delete(authUrl, {
        headers: {
          'access-token': accessToken,
          client: client,
          uid: uid,
        },
      })
      .then(() => {
        localStorage.clear()
        dispatch(signOutAction())
      })
      .catch((error) => {
        console.error(' Error Sign out', error)
        alert('アカウント削除に失敗しました')
      })
  }
}

export const guestSignIn = () => {
  return async (dispatch) => {
    const username = 'ゲストユーザ',
      email = Math.random().toString(36).slice(-16) + '@example.com',
      password = Math.random().toString(36).slice(-12),
      confirmPassword = password

    localStorage.clear()
    dispatch(signOutAction())

    try {
      await axios.post(authUrl, {
        name: username,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      })

      const response = await axios.post(signInUrl, {
        email: email,
        password: password,
      })

      const accessToken = response.headers['access-token'],
        client = response.headers['client'],
        uid = response.headers['uid']

      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('client', client)
      localStorage.setItem('uid', uid)
    } catch (error) {
      console.error('Can not guest sign in', error)
      alert('ゲストサインインできませんでした。もう一度お試しください')
    }
  }
}

export const updateUser = (userimage, username, email) => {
  return async (dispatch) => {
    if (username === '') {
      alert('ユーザ名を入力してください')
      return false
    }
    if (email === '') {
      alert('メールアドレスを入力してください')
      return false
    }
    if (!userimage || !(userimage instanceof File)) {
      alert('アカウント画像が未設定です')
      return false
    }

    try {
      // FormDataオブジェクトに変換
      const formData = new FormData()
      formData.append('name', username)
      formData.append('email', email)
      formData.append('image', userimage)

      // FormDataオブジェクトとして送信
      const response = await axios.put(authUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })

      dispatch(
        signInAction({
          isSignedIn: true,
          uid: response.data.data.uid,
          username: response.data.data.name,
          email: response.data.data.email,
          userimage: response.data.data.image,
        }),
      )
    } catch (error) {
      console.error('Can not update user', error)
      alert('ユーザ情報を更新できませんでした。もう一度お試しください')
    }
  }
}

export const sendPasswordURL = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('メールアドレスを入力してください')
      return false
    }

    try {
      await axios.post(passwordUrl, {
        email: email,
        redirect_url: updatePasswordUrl,
      })

      alert('パスワード再設定用リンクをご登録のメールアドレスにお送りしました')
    } catch (error) {
      console.error('Can not send link', error)
      alert('パスワード再設定用リンクを送信できませんでした。もう一度お試しください')
    }
  }
}

export const updatePassword = (password, confirmPassword, token) => {
  return async (dispatch) => {
    if (password === '') {
      alert('パスワードを入力してください')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度お試しください')
      return false
    }

    try {
      await axios.put(passwordUrl, {
        password: password,
        password_confirmation: confirmPassword,
        reset_password_token: token,
      })
    } catch (error) {
      console.error('Can not reset password', error)
      alert('パスワードを更新できませんでした。もう一度お試しください')
    }
  }
}
