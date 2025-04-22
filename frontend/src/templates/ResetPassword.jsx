import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { sendPasswordURL } from '../reducks/users/operations'

const ResetPasswordContainer = styled('div')(({ theme }) => ({
  minHeight: `calc(100vh - 60px - 80px)`,
  display: 'flex',
  flexDirection: 'column',
}))

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail],
  )

  const handleSendPasswordURL = () => {
    dispatch(sendPasswordURL(email))
    navigate(`/`)
  }

  return (
    <ResetPasswordContainer>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
          <Typography component="h1" variant="h5">
            パスワード再設定の手続き
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
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
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <PrimaryButton label={'パスワード再設定用のURLを送信'} onClick={handleSendPasswordURL} />
              <Typography sx={{ mt: 1, cursor: 'pointer' }} onClick={() => navigate('/signin')}>
                ログイン画面に戻る
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ResetPasswordContainer>
  )
}

export default ResetPassword
