import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage, Customtext } from '.';
import { Calendar } from 'react-native-calendars';

const Container = styled.View`
  padding: 10px;
  margin: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };

const FoodCalender = () => {
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  });

  const markedDates = {
    [selectedDay]: { selected: true },

    '2024-04-16': { dots: [vacation, massage, workout] },
    '2024-04-17': { dots: [massage, workout, vacation], disabled: true },
    '2024-04-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
    '2024-04-19': { disabled: true, disableTouchEvent: true },
  };

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
      />
    </Container>
  );
};

export default FoodCalender;
