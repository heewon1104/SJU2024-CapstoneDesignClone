import React, { useContext, useState, useRef, useEffect } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { MainPageDataContext } from '../contexts';

const CalanderBar = () => {
  const { data, setData: updateDataInfo } = useContext(MainPageDataContext);
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

  const updateDate = (day) => {
    const convertedDay = formatDate(day);
    setSelectedDay(() => convertedDay);

    updateDataInfo({
      date: convertedDay,
    });
  };

  return (
    <CalendarStrip
      scrollable
      style={{ height: 100, paddingTop: 20, paddingBottom: 10, width: 400 }}
      calendarHeaderStyle={{ color: 'black' }}
      dateNumberStyle={{ color: 'black' }}
      dateNameStyle={{ color: 'black', fontSize: 10 }}
      iconContainer={{ flex: 0.1 }}
      onDateSelected={(day) => {
        updateDate(day);
      }}
    />
  );
};

export default CalanderBar;
