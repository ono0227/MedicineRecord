import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { returnCodeToBr } from '../../helper'

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
}))

const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '100%',
})

const StyledCardContent = styled(CardContent)({
  textAlign: 'left',
  paddingBottom: 16,
  '&:last-child': {
    paddingBottom: 16,
  },
})

const Post = (props) => {
  const navigate = useNavigate()
  const { post } = props

  const handleClick = () => {
    navigate(`/posts/${post.id}`)
  }

  return (
    <StyledCard onClick={handleClick}>
      {post.medicine.medicine_image ? (
        <StyledCardMedia image={post.medicine.medicine_image} title={post.medicine.name} />
      ) : (
        <StyledCardMedia title={post.medicine.name}>画像なし</StyledCardMedia>
      )}
      <StyledCardContent>
        <Typography variant="h6" component="h2">
          {post.medicine.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          実際の服薬量：{post.ingestion_amount}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          コメント：{returnCodeToBr(post.comment)}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  )
}

export default Post
