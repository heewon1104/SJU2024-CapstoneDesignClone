import { onDateSelected } from 'react-native-calendar-strip';
import CalendarStrip from 'react-native-calendar-strip';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const CalanderBar = () => {
  return (
    <CalendarStrip
      scrollable
      style={{ height: 100, paddingTop: 20, paddingBottom: 10, width: 400 }}
      //calendarColor={'#3343CE'}
      calendarHeaderStyle={{ color: 'black' }}
      dateNumberStyle={{ color: 'black' }}
      dateNameStyle={{ color: 'black', fontSize: 10 }}
      iconContainer={{ flex: 0.1 }}
      onDateSelected={(day) => {
        console.log('selected day', day);
      }}
    />
  );
};

export default CalanderBar;
