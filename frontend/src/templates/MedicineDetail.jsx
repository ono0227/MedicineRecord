import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { PrimaryButton } from '../components/UIkit'
import { deleteMedicine, fetchMedicines } from '../reducks/medicines/operations'
import { getMedicines } from '../reducks/medicines/selectors'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
}))

const MedicineDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const selector = useSelector((state) => state)
  const medicines = getMedicines(selector)

  const [medicineName, setMedicineName] = useState('')
  const [medicineImage, setMedicineImage] = useState('')
  const [memo, setMemo] = useState('')
  const [unit, setUnit] = useState('')
  const [ingestionTimesPerDay, setIngestionTimesPerDay] = useState('')
  const [ingestionAmountEveryTime, setIngestionAmountEveryTime] = useState('')
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    dispatch(fetchMedicines())
  }, [dispatch])

  useEffect(() => {
    const targetMedicine = medicines.find((medicine) => String(medicine.id) === id)
    if (targetMedicine) {
      setMedicineName(targetMedicine.name)
      setMedicineImage(targetMedicine.medicine_image)
      setMemo(targetMedicine.memo)
      setUnit(targetMedicine.unit)
      setIngestionTimesPerDay(String(targetMedicine.ingestion_times_per_day))
      setIngestionAmountEveryTime(String(targetMedicine.ingestion_amount_every_time))
      setCategoryName(targetMedicine.category_name)
    }
  }, [
    id,
    medicines,
    setMedicineName,
    setMedicineImage,
    setMemo,
    setUnit,
    setIngestionTimesPerDay,
    setIngestionAmountEveryTime,
    setCategoryName,
  ])

  const handleDeleteMedicine = () => {
    dispatch(deleteMedicine(id))
    navigate('/medicines/index')
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          薬の詳細
        </Typography>
        <StyledPaper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {medicineImage && (
                <img
                  src={typeof medicineImage === 'string' ? medicineImage : medicineImage.url}
                  alt="薬の画像"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6">薬の名前：{medicineName}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                カテゴリー名：{categoryName}
              </Typography>
              <Typography variant="body1">1日の服薬回数：{ingestionTimesPerDay}</Typography>
              <Typography variant="body1">
                1回の服薬量：{ingestionAmountEveryTime} {unit}
              </Typography>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                メモ：{memo}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <PrimaryButton
                  label={'薬情報を編集'}
                  onClick={() => navigate(`/medicines/edit/${id}`)}
                  sx={{ mr: 2 }}
                />
                <PrimaryButton label={'薬情報を削除'} onClick={handleDeleteMedicine} color="error" />
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </Container>
  )
}

export default MedicineDetail
