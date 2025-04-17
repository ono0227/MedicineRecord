import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import React from 'react'

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
}))

const TextInput = (props) => {
  const { label, multiline, rows, value, type, onChange, required, fullWidth } = props
  return (
    <StyledTextField
      label={label}
      multiline={multiline}
      rows={rows}
      value={value}
      type={type}
      onChange={onChange}
      required={required}
      fullWidth={fullWidth}
      variant="outlined"
    />
  )
}

export default TextInput
