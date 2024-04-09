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

const FoodList = () => {
  return <Container></Container>;
};

export default FoodList;
