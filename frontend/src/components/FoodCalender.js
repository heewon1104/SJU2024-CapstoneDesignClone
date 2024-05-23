import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage, Customtext } from '.';
import { Calendar } from 'react-native-calendars';

const Container = styled.View`
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const FoodCalender = ({
  markedDates,
  selectedDay,
  setSelectedDay,
  onMonthChange,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Calendar
        style={{
          width: 300,
        }}
        onDayPress={(day) => {
          console.log('selected day', day);
          setSelectedDay(() => day.dateString);
        }}
        markingType={'multi-dot'}
        markedDates={markedDates}
        onMonthChange={onMonthChange}
      />
    </Container>
  );
};

export default FoodCalender;
