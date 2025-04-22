import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { updatePassword } from '../reducks/users/operations'

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // URL から reset_password_token という名前のパラメータの値を取得
  const token = searchParams.get('reset_password_token')

  const [password, setPassword] = useState(''),
    [confirmPassword, setComfirmPassword] = useState('')

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

  const handleUpdatePassword = () => {
    if (token) {
      dispatch(updatePassword(password, confirmPassword, token))
      navigate('/signin')
    } else {
      alert('パスワード再設定トークンが無効です。もう一度、再設定のメールからアクセスしてください。')
      navigate('/signin')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          パスワードを更新
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
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
            <PrimaryButton label={'パスワードを更新'} onClick={handleUpdatePassword} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
export default UpdatePassword
