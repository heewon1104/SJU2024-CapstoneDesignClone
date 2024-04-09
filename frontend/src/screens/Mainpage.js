import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {
  CalanderBar,
  DoughnutGraph,
  LineChart,
  HealthScore,
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
`;

const GraphContainer = styled.View`
  flex-direction: row;
  padding: 20px 0px;
`;

const LineGraphContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
`;

const Mainpage = ({ navigation }) => {
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
    <Container>
      <CalanderBar></CalanderBar>

      <GraphContainer>
        <LineGraphContainer>
          <HealthScore></HealthScore>
          <LineChart></LineChart>
          <LineChart></LineChart>
          <LineChart></LineChart>
        </LineGraphContainer>
        <LineGraphContainer>
          <DoughnutGraph></DoughnutGraph>
        </LineGraphContainer>
      </GraphContainer>
    </Container>
  );
};
export default Mainpage;
