import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { Customtext, HealthScoreChart, TextBox } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '../secret/env';
import { ScrollView } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const MyInfo = ({ navigation }) => {
  const [instruction, setInstruction] = useState('');

  const insets = useSafeAreaInsets();

  const updateInstructionData = async () => {
    const url = `http://${IP_ADDRESS}:8080/api/mypage/instruction`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json(); // JSON 형식으로 데이터를 추출합니다.
        setInstruction(responseData.instruction); // 상태 업데이트
        console.log('AnalysisFood successful', responseData);
      } else {
        const errorData = await response.json(); // 오류 응답도 JSON으로 추출할 수 있습니다.
        console.error('AnalysisFood failed:', errorData);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    }
  };

  useEffect(() => {
    updateInstructionData();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('Mount!!!!!!');
  //     updateInstructionData();
  //   }, [])
  // );

  return (
    <ScrollView>
      <Container insets={insets}>
        <TextBox
          title="Tip"
          explanation={instruction}
          titleColor="purple"
        ></TextBox>
        <HealthScoreChart></HealthScoreChart>
      </Container>
    </ScrollView>
  );
};
export default MyInfo;
