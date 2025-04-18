import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { signUp } from '../reducks/users/operations'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setComfirmPassword] = useState('')

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value)
    },
    [setUsername],
  )

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail],
  )

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value)
    },
    [setPassword],
  )

  const inputConfirmPassword = useCallback(
    (event) => {
      setComfirmPassword(event.target.value)
    },
    [setComfirmPassword],
  )

  const handleSignUp = () => {
    dispatch(signUp(username, email, password, confirmPassword))
    navigate('/signin')
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          アカウント登録
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <TextInput
            fullWidth={true}
            label={'ユーザ名'}
            multiline={false}
            required={true}
            rows={1}
            value={username}
            type={'text'}
            onChange={inputUsername}
          />
          <TextInput
            fullWidth={true}
            label={'メールアドレス'}
            multiline={false}
            required={true}
            rows={1}
            value={email}
            type={'email'}
            onChange={inputEmail}
          />
          <TextInput
            fullWidth={true}
            label={'パスワード'}
            multiline={false}
            required={true}
            rows={1}
            value={password}
            type={'password'}
            onChange={inputPassword}
          />
          <TextInput
            fullWidth={true}
            label={'パスワード（再確認）'}
            multiline={false}
            required={true}
            rows={1}
            value={confirmPassword}
            type={'password'}
            onChange={inputConfirmPassword}
          />
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PrimaryButton label={'アカウントを登録する'} onClick={handleSignUp} />
            <Typography sx={{ mt: 1, cursor: 'pointer' }} onClick={() => navigate('/signin')}>
              アカウントをお持ちの方はこちら
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
