import React, { useContext, useState, useEffect } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
<<<<<<< HEAD
import { MainPageDataContext } from '../contexts';

const CalendarBar = () => {
  const { data, setData: updateDataInfo } = useContext(MainPageDataContext);
  const [selectedDay, setSelectedDay] = useState(new Date()); // 현재 날짜를 Date 객체로 초기화
  const [customStyles, setCustomStyles] = useState([]);

  useEffect(() => {
    const rangeDays = createRangeDays(selectedDay);
    setCustomStyles(rangeDays);
  }, [selectedDay]);

  const createRangeDays = (selectedDate) => {
    let styles = [];
    for (let i = -7; i <= 7; i++) {
      let date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      styles.push({
        startDate: date,
        dateNameStyle: { color: 'gray' },
        dateNumberStyle: { color: 'gray' },
      });
    }
    return styles;
  };

  const updateDate = (day) => {
    setSelectedDay(day);
    updateDataInfo({
      date: formatDate(day),
    });
  };

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }

=======
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const CalanderBar = () => {
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    return formatDate(today);
  });

  function formatDate(date) {
    const today = new Date(date);
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }
>>>>>>> parent of 44a05ae0 ([IN-68] 음식 분석, 기록 페이지 구현 및 API 연결)
  return (
    <CalendarStrip
      scrollable
      selectedDate={selectedDay}
      style={{ height: 100, paddingTop: 20, paddingBottom: 10, width: 400 }}
      calendarHeaderStyle={{ color: 'black' }}
      dateNumberStyle={{ color: 'black' }}
      dateNameStyle={{ color: 'black', fontSize: 10 }}
      iconContainer={{ flex: 0.1 }}
<<<<<<< HEAD
      customDatesStyles={customStyles}
      onDateSelected={updateDate}
=======
      onDateSelected={(day) => {
        console.log('selected day', day);
        setSelectedDay(() => formatDate(day));
      }}
>>>>>>> parent of 44a05ae0 ([IN-68] 음식 분석, 기록 페이지 구현 및 API 연결)
    />
  );
};

export default CalendarBar;
