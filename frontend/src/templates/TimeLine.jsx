import { Refresh } from '@mui/icons-material'
import { IconButton, Typography, CircularProgress, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Post } from '../components/Post'
import { NavigateTabs } from '../components/UIkit'
import { fetchPosts } from '../reducks/posts/operations'
import { getPosts } from '../reducks/posts/selectors'
import 'dayjs/locale/ja'
dayjs.locale('ja')

const RefreshButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  zIndex: 1000,
}))

//サイズを調整
const TimelineContainer = styled('div')(({ theme }) => ({
  minHeight: `calc(100vh - 60px - 80px)`,
  paddingBottom: theme.spacing(4),
}))

const Timeline = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const posts = getPosts(selector)
  const [loading, setLoading] = useState(false)
  const [continuousDays, setContinuousDays] = useState(0)
  const location = useLocation()
  const [currentTabUrl, setCurrentTabUrl] = useState(location.pathname)

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

  const fetch = useCallback(async () => {
    setLoading(true)
    await dispatch(fetchPosts())
    setLoading(false)
  }, [dispatch])

  useEffect(() => {
    fetch()
  }, [fetch])

  useEffect(() => {
    if (posts && posts.length > 0) {
      // 投稿日のみを抽出して重複を削除し、降順にソート
      const uniqueSortedDates = [...new Set(posts.map((post) => dayjs(post.updated_at).startOf('day').valueOf()))]
        .sort((a, b) => b - a)
        .map((timestamp) => dayjs(timestamp))

      const today = dayjs().startOf('day')
      const hasTodayPost = uniqueSortedDates.some((date) => date.isSame(today, 'day'))
      let count = 0

      if (hasTodayPost) {
        // 今日投稿がある場合、カウント開始
        count = 1
        let currentDate = today.subtract(1, 'day')

        for (const postDate of uniqueSortedDates) {
          if (currentDate.isSame(postDate, 'day')) {
            count++
            currentDate = currentDate.subtract(1, 'day')
          } else if (currentDate.isAfter(postDate, 'day')) {
            // 途切れたらストップ
            break
          }
        }
      } else {
        // 今日投稿がなければ、0日間継続
        count = 0
      }

      setContinuousDays(count)
    } else {
      setContinuousDays(0)
    }
  }, [posts])

  return (
    <TimelineContainer className="c-section-container">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        タイムライン
      </Typography>
      <RefreshButton onClick={() => fetch()} aria-label="refresh">
        <Refresh />
      </RefreshButton>
      {continuousDays > 0 && (
        <Typography variant="subtitle1" gutterBottom>
          {continuousDays}日間 服薬継続中です！
        </Typography>
      )}
      {continuousDays === 0 && (
        <Typography variant="subtitle1" gutterBottom>
          0日間 服薬継続中です！
        </Typography>
      )}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Grid key={post.id} item xs={12} sm={8} md={6}>
                <Post post={post} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">まだ投稿がありません</Typography>
          )}
        </Grid>
      )}
      <NavigateTabs tabConfig={tabConfig} value={currentTabUrl} onChange={handleTabChange} />
    </TimelineContainer>
  )
}

export default Timeline
