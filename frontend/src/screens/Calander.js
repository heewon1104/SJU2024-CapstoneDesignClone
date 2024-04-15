import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  FoodCalender,
  MealTypeListItem,
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding-top: 20px;
`;

const Calander = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const _handleSigninBtnPress = () => {
    //navigation.navigate('Profile', { user });
    // try {
    //   const user = await signin({ email, password });
    //   navigation.navigate('Profile', { user });
    // } catch (e) {
    //   Alert.alert('로그인 오류', e.message);
    // }
  };

  return (
    <Container insets={insets}>
      <FoodCalender></FoodCalender>
      <MealTypeListItem
        title="아침"
        foodtype="빵, 샐러드"
        calorie="500"
        color="red"
      ></MealTypeListItem>
      <MealTypeListItem
        title="아침"
        foodtype="빵, 샐러드"
        calorie="500"
        color="blue"
      ></MealTypeListItem>
      <MealTypeListItem
        title="아침"
        foodtype="빵, 샐러드"
        calorie="500"
        color="green"
      ></MealTypeListItem>
      <MealTypeListItem
        title="아침"
        foodtype="빵, 샐러드"
        calorie="500"
        color="purple"
      ></MealTypeListItem>
    </Container>
  );
};
export default Calander;
