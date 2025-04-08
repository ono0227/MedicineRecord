import React, { useCallback, useEffect, useState } from "react";
import dayjs from 'dayjs';
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../reducks/posts/selectors";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { fetchPosts } from "../reducks/posts/operations";
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { NavigateTabs } from "../components/UIkit";
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const StyledSelect = styled(Select)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
}));

const Calendar = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const posts = getPosts(selector);
    const location = useLocation();
    const [currentTabUrl, setCurrentTabUrl] = useState(location.pathname);

    const [selectedMedicineName, setSelectedMedicineName] = useState("");
    const [highlightedDays, setHighlightedDays] = useState({});
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleTabChange = (newUrl) => {
        setCurrentTabUrl(newUrl);
    };

    //tabリストを作成
    const tabConfig = [
        { index: 0, label: 'タイムライン', value: '/timeline' },
        { index: 1, label: 'カレンダー', value: '/calendar' },
        { index: 2, label: 'グラフ', value: '/bargraph' },
        { index: 3, label: '記録', value: '/posts/create' },
        { index: 4, label: '薬一覧', value: '/medicines/index' },
    ];

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    //重複箇所を除外
    const medicineOptions = posts
        ?.filter(post => post.medicine?.name)
        .map(post => ({ label: post.medicine.name, value: post.medicine.name }))
        .filter((option, index, self) => self.findIndex(o => o.value === option.value) === index)
        ?? [];

    const handleMedicineChange = useCallback((event) => {
        setSelectedMedicineName(event.target.value);
    }, [setSelectedMedicineName]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        //選択された薬と投稿一覧が実在する場合
        if (selectedMedicineName && posts) {
            const accomplishedDaysMap = {};
            const filteredPostsByMedicine = posts.filter(
                post => post.medicine?.name === selectedMedicineName
            );

            //acc配列のdateキーにpostを入れていく
            const groupedPostsByDate = filteredPostsByMedicine.reduce((acc, post) => {
                //dateの書式を定義
                const date = dayjs(post.updated_at).format('YYYY-MM-DD');
                acc[date] = acc[date] || [];
                acc[date].push(post);
                return acc;
            }, {});

            //薬の情報を取得
            for (const date in groupedPostsByDate) {
                const dailyPosts = groupedPostsByDate[date];
                const medicineInfo = dailyPosts[0]?.medicine;

                if (medicineInfo) {
                    const totalIngestionAmount = dailyPosts.reduce(
                        (sum, post) => sum + parseInt(post.ingestion_amount || 0, 10),
                        0
                    );
                    const expectedTotalAmount = medicineInfo.ingestion_times_per_day * medicineInfo.ingestion_amount_every_time;

                    if (dailyPosts.length === medicineInfo.ingestion_times_per_day && totalIngestionAmount === expectedTotalAmount) {
                        accomplishedDaysMap[date] = true;
                    }
                }
            }
            setHighlightedDays(accomplishedDaysMap);
        } else {
            setHighlightedDays({});
        }
    }, [selectedMedicineName, posts]);

    useEffect(() => {
        if (posts && posts.length > 0) {
            // 最新の投稿の updated_at を取得
            const latestPostDate = posts.reduce((latest, current) => {
                const currentUpdatedAt = dayjs(current.updated_at);
                return latest && latest.isAfter(currentUpdatedAt) ? latest : currentUpdatedAt;
            }, null);

            // 最新の投稿が、その月の初めにselectedDateを設定
            if (latestPostDate) {
                setSelectedDate(latestPostDate.startOf('month'));
            }
        }
    }, [posts]);

    const renderDay = (date, selected) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const isAccomplished = highlightedDays[formattedDate];
        const dayClassName = selected ? 'Mui-selected' : '';

        return (
            <Badge
                key={date.toString()}
                overlap="circular"
                badgeContent={isAccomplished ? <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1976d2' }} /> : null}
            >
                <div className={dayClassName} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {date.format('D')}
                </div>
            </Badge>
        );
    };

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">カレンダー</h2>
            <StyledSelect
                labelId="medicine-select-label"
                id="medicine-select"
                value={selectedMedicineName}
                label={"薬を選択"}
                onChange={handleMedicineChange}
            >
                {medicineOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </StyledSelect>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderDay={(day, _value, dayInCurrentMonth) => dayInCurrentMonth && renderDay(day, _value)}
                />
            </LocalizationProvider>

            {selectedMedicineName && Object.keys(highlightedDays).length > 0 && (
                <p>{selectedMedicineName} を指定された回数・量を服薬した日には印が付きます。</p>
            )}
            {selectedMedicineName && Object.keys(highlightedDays).length === 0 && posts.some(post => post.medicine?.name === selectedMedicineName) && (
                <p>{selectedMedicineName} で指定された回数・量を服薬した日はまだありません。</p>
            )}
            {selectedMedicineName && !posts.some(post => post.medicine?.name === selectedMedicineName) && (
                <p>{selectedMedicineName} の服薬記録はありません。</p>
            )}

            <NavigateTabs
                tabConfig={tabConfig}
                value={currentTabUrl}
                onChange={handleTabChange}
            />

        </div>
    );
};

export default Calendar;
