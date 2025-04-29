import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import defaultMedicineImage from '../../assets/img/defaultMeidicineImage.png'

const StyledCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1),
    width: `calc(50% - ${theme.spacing(2)})`,
  },
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(2),
    width: `calc(33.3333% - ${theme.spacing(4)})`,
  },
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(2),
    width: `calc(33.3333% - ${theme.spacing(4)})`,
  },
  [theme.breakpoints.up('lg')]: {
    margin: theme.spacing(2),
    width: '100%',
  },
}))

const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '100%',
  cursor: 'pointer',
})

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  padding: '16px 8px',
  textAlign: 'left',
  '&:last-child': {
    paddingBottom: 16,
  },
  cursor: 'pointer',
})

const Medicine = (props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/medicines/${props.id}`)
  }

  return (
    <StyledCard>
      {props.medicineImage ? (
        <StyledCardMedia image={props.medicineImage} title="" onClick={handleClick} />
      ) : (
        <StyledCardMedia image={defaultMedicineImage} onClick={handleClick} />
      )}
      <StyledCardContent onClick={handleClick}>
        <div>
          {props.categoryName && props.categoryName !== '' ? <p>{props.categoryName}</p> : <p>カテゴリー未設定</p>}
          {props.medicineName}
        </div>
      </StyledCardContent>
    </StyledCard>
  )
}

export default Medicine
