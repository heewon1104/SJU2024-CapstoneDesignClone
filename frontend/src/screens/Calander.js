import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  FoodCalender,
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0% 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
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
    </Container>
  );
};
export default Calander;
