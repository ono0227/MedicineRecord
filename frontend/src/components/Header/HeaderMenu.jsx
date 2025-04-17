import { IconButton, MenuItem, Menu, Avatar } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import guestUserImage from '../../assets/img/guest_user_image.png'
import { signOut } from '../../reducks/users/operations'

const HeaderMenu = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenuToggle = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const hasUserimage = useCallback(() => {
    return props.username === 'ゲストユーザ' || (props.username !== 'ゲストユーザ' && props.userimage === '')
  }, [props.username, props.userimage])

  const handleUserDetailClick = () => {
    navigate('/users/detail')
    handleClose()
  }

  const handleSignOutClick = () => {
    dispatch(signOut())
    navigate('/')
    handleClose()
  }

  return (
    <div>
      <IconButton onClick={handleMenuToggle}>
        <Avatar
          alt={props.username}
          src={hasUserimage() ? guestUserImage : props.userimage}
          sx={{ width: 40, height: 40 }}
        />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleUserDetailClick}>ユーザ設定</MenuItem>
        <MenuItem onClick={handleSignOutClick}>サインアウト</MenuItem>
      </Menu>
    </div>
  )
}

export default HeaderMenu
