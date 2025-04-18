import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import React, { useState, useCallback, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { NavigateTabs } from '../components/UIkit'
import { fetchPosts } from '../reducks/posts/operations'
import { getPosts } from '../reducks/posts/selectors'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  //marginBottom: theme.spacing(2),
}))

const BarGraphContainer = styled('div')(({ theme }) => ({
  minHeight: `calc(100vh - 60px - 80px)`,
  paddingBottom: theme.spacing(6),
}))

const BarGraph = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const posts = getPosts(selector)
  const location = useLocation()
  const [currentTabUrl, setCurrentTabUrl] = useState(location.pathname)

  const [selectedMedicineName, setSelectedMedicineName] = useState('')
  const [chartData, setChartData] = useState(null)
  const [yAxisLabel, setYAxisLabel] = useState('')

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
    dispatch(fetchPosts())
  }, [dispatch])

  //重複箇所を除外
  const medicineOptions =
    posts
      ?.filter((post) => post.medicine?.name)
      .map((post) => ({ label: post.medicine.name, value: post.medicine.name }))
      .filter((option, index, self) => self.findIndex((o) => o.value === option.value) === index) ?? []

  const handleMedicineChange = useCallback(
    (event) => {
      setSelectedMedicineName(event.target.value)
    },
    [setSelectedMedicineName],
  )

  useEffect(() => {
    //薬の名前と投稿一覧が実在する場合
    if (selectedMedicineName && posts) {
      const monthlyData = {}
      let unit = ''

      posts
        .filter((post) => post.medicine?.name === selectedMedicineName)
        .forEach((post) => {
          const date = new Date(post.updated_at)
          //年月の書式を定義
          const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          const amount = parseInt(post.ingestion_amount, 10)

          //amountが数値である場合
          if (!isNaN(amount)) {
            monthlyData[yearMonth] = (monthlyData[yearMonth] || 0) + amount
          }
          if (post.medicine?.unit) {
            unit = post.medicine.unit
          }
        })

      //monthlyDataオブジェクトのキーを取得し、年月の書式を変更
      const labels = Object.keys(monthlyData)
        .sort()
        .map((ym) => ym.split('-').join('/'))
      //monthlyDataオブジェクトのバリューを取得
      const data = Object.values(monthlyData)

      setChartData({
        labels: labels,
        datasets: [
          {
            label: selectedMedicineName,
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
          },
        ],
      })
      setYAxisLabel(unit)
    } else {
      setChartData(null)
      setYAxisLabel('')
    }
  }, [selectedMedicineName, posts])

  const chartOptions = selectedMedicineName
    ? {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${selectedMedicineName} 月別服薬量`,
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: yAxisLabel,
            },
            beginAtZero: true,
          },
        },
      }
    : {}

  return (
    <BarGraphContainer className="c-section-container">
      <h2 className="u-text__headline u-text-center">月別服薬量</h2>
      <StyledSelect
        labelId="medicine-select-label"
        id="medicine-select"
        value={selectedMedicineName}
        label={'薬を選択'}
        onChange={handleMedicineChange}
      >
        {medicineOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
      {chartData && <Bar data={chartData} options={chartOptions} />}
      {selectedMedicineName && !chartData && <p>{selectedMedicineName} の記録はありません。</p>}
      <NavigateTabs tabConfig={tabConfig} value={currentTabUrl} onChange={handleTabChange} />
    </BarGraphContainer>
  )
}

export default BarGraph
