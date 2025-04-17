import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import guestUserImage from '../assets/img/guest_user_image.png'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { UserImageArea } from '../components/User'
import { updateUser } from '../reducks/users/operations'
import { getEmail, getUserImage, getUserName } from '../reducks/users/selectors'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

const UserEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selector = useSelector((state) => state)

  const prevusername = getUserName(selector),
    prevuserimage = getUserImage(selector),
    prevemail = getEmail(selector)

  const [username, setUsername] = useState(prevusername),
    [email, setEmail] = useState(prevemail),
    [userimage, setUserImage] = useState(prevuserimage)

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

  const hasUserimage = useCallback(() => {
    return prevusername === 'ゲストユーザ' || (prevusername !== 'ゲストユーザ' && prevuserimage === '')
  }, [prevusername, prevuserimage])

  const handleUpdateUser = () => {
    dispatch(updateUser(userimage, username, email))
    navigate('/users/detail')
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" gutterBottom>
          ユーザ情報の編集
        </Typography>
        <StyledPaper sx={{ width: '100%', mt: 2 }}>
          <Avatar
            alt={username}
            src={hasUserimage() ? guestUserImage : userimage}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <UserImageArea setUserImage={setUserImage} />
          <TextInput
            fullWidth={true}
            label={'ユーザ名'}
            multiline={false}
            required={true}
            rows={1}
            value={username}
            type={'text'}
            onChange={inputUsername}
            sx={{ mt: 2 }}
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
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PrimaryButton label={'ユーザ情報を保存'} onClick={handleUpdateUser} />
            <Typography sx={{ mt: 1, cursor: 'pointer' }} onClick={() => navigate('/users/detail')}>
              戻る
            </Typography>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  )
}

export default UserEdit
