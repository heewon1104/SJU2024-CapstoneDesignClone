import React, { useContext, useState, useRef, useEffect } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
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
  return (
    <CalendarStrip
      scrollable
      style={{ height: 100, paddingTop: 20, paddingBottom: 10, width: 400 }}
      calendarHeaderStyle={{ color: 'black' }}
      dateNumberStyle={{ color: 'black' }}
      dateNameStyle={{ color: 'black', fontSize: 10 }}
      iconContainer={{ flex: 0.1 }}
      onDateSelected={(day) => {
        console.log('selected day', day);
        setSelectedDay(() => formatDate(day));
      }}
    />
  );
};

export default CalanderBar;
