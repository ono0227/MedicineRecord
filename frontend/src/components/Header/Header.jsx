import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { styled } from '@mui/material/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.jpg'
import { guestSignIn } from '../../reducks/users/operations'
import { getIsSignedIn, getUserImage, getUserName } from '../../reducks/users/selectors'
import { PrimaryButton } from '../UIkit'
import HeaderMenu from './HeaderMenu'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#06D8F8',
  height: '60px',
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: 1024,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const LogoImage = styled('img')({
  cursor: 'pointer',
  height: '40px',
})

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector),
    userimage = getUserImage(selector),
    username = getUserName(selector)

  const handleLogoClick = () => {
    if (isSignedIn) {
      navigate('/timeline')
    } else {
      navigate('/')
    }
  }

  const handleGuestSignIn = () => {
    dispatch(guestSignIn())
    navigate('/timeline')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <LogoImage src={logo} alt="サイトロゴ" onClick={handleLogoClick} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isSignedIn && (
              <>
                <PrimaryButton label={'新規登録'} onClick={() => navigate('/signup')} />
                <PrimaryButton label={'ゲストログイン'} onClick={handleGuestSignIn} />
                <PrimaryButton label={'ログイン'} onClick={() => navigate('/signin')} />
              </>
            )}
            {isSignedIn && <HeaderMenu userimage={userimage} username={username} />}
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <Toolbar />
    </Box>
  )
}

export default Header
