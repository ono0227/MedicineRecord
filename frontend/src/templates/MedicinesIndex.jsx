import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Medicine } from '../components/Medicine'
import { NavigateTabs } from '../components/UIkit'
import { fetchMedicines } from '../reducks/medicines/operations'
import { getMedicines } from '../reducks/medicines/selectors'

const MedicinesIndexContainer = styled('div')(({ theme }) => ({
  minHeight: `calc(100vh - 60px - 80px)`,
  paddingBottom: theme.spacing(4),
}))

const MedicinesIndex = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentTabUrl, setCurrentTabUrl] = useState(location.pathname)
  const selector = useSelector((state) => state)
  const medicines = getMedicines(selector)

  const handleTabChange = (newUrl) => {
    setCurrentTabUrl(newUrl)
  }

  //tabリストを作成
  const tabConfig = [
    { index: 0, label: 'タイムライン', value: '/timeline' },
    { index: 1, label: 'カレンダー', value: '/calendar' },
    { index: 2, label: 'グラフ', value: '/bargraph' },
    { index: 3, label: '記録', value: '/posts/create' },
    { index: 4, label: '薬一覧', value: '/medicines/index' },
  ]

  useEffect(() => {
    dispatch(fetchMedicines())
  }, [dispatch])

  return (
    <MedicinesIndexContainer>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            登録済みの薬
          </Typography>
          <Grid container spacing={2}>
            {medicines && medicines.length > 0 ? (
              medicines.map((medicine) => (
                <Grid item xs={12} sm={6} md={6} key={medicine.id}>
                  <Medicine
                    id={medicine.id}
                    medicineName={medicine.name}
                    medicineImage={medicine.medicine_image}
                    categoryName={medicine.category_name}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1">薬の情報がありません</Typography>
              </Grid>
            )}
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography
              component="p"
              sx={{ cursor: 'pointer', color: 'primary.main' }}
              onClick={() => navigate('/medicines/create')}
            >
              薬を登録する
            </Typography>
          </Box>
          <NavigateTabs tabConfig={tabConfig} value={currentTabUrl} onChange={handleTabChange} />
        </Box>
      </Container>
    </MedicinesIndexContainer>
  )
}

export default MedicinesIndex
