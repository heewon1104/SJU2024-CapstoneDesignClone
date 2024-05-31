import React, { useContext, useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import styled, { ThemeContext } from 'styled-components/native';
import {
  CalanderBar,
  DoughnutGraph,
  LineChart,
  HealthScore,
  Feedback,
  LoadingModal,
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { UserLoginInfoContext, MainPageDataContext } from '../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '../secret/env';
import { ScrollView } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

const GraphContainer = styled.View`
  flex-direction: row;

  margin-bottom: ${Platform.OS === 'android' ? '15px' : '30px'};
`;

const LineGraphContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
`;

const Mainpage = ({ navigation }) => {
  const { data, setData: updateDataInfo } = useContext(MainPageDataContext);
  const theme = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const updateTotalData = async () => {
    setIsLoading(true);
    const url = `http://${IP_ADDRESS}:8080/api/main/dri`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      });

      const responseData = await response.json();
      const statusRes = await response.status;

      if (response.ok) {
        updateDataInfo({
          carbohydrateTotal: Math.round(responseData.carbohydrate_g),
          proteinTotal: Math.round(responseData.protein_g),
          fatTotal: Math.round(responseData.fat_g),
          kcalTotal: Math.round(responseData.energy_kcal),
        });
      } else {
        console.error('AnalysisFood failed:', statusRes);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateValueData = async () => {
    setIsLoading(true);
    const url = `http://${IP_ADDRESS}:8080/api/main/intake`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    const payload = { date: data.date };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('payload : ', payload);

      const responseData = await response.json();
      const statusRes = await response.status;

      if (response.ok) {
        console.log('AnalysisFood successful', statusRes);
        console.log('value : ', responseData);
        updateDataInfo({
          carbohydrateValue:
            responseData.total_carbohydrate_g === null
              ? 0
              : Math.round(responseData.total_carbohydrate_g),
          proteinValue:
            responseData.total_protein_g === null
              ? 0
              : Math.round(responseData.total_protein_g),
          fatValue:
            responseData.total_fat_g === null
              ? 0
              : Math.round(responseData.total_fat_g),
          kcalValue:
            responseData.total_energy_kcal === null
              ? 0
              : Math.round(responseData.total_energy_kcal),
        });
      } else {
        console.error('AnalysisFood failed:', statusRes);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeedback = async () => {
    setIsLoading(true);
    const url = `http://${IP_ADDRESS}:8080/api/main/feedback/${data.date}`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        // 데이터가 있고, 'feedback' 키가 있는지 확인
        if (responseData.feedback) {
          console.log(responseData);
          updateDataInfo({
            feedback: responseData.feedback,
          });
        } else if (
          responseData.message &&
          responseData.message === 'No Record'
        ) {
          // 'No Record' 메시지가 있을 경우
          updateDataInfo({
            feedback: '현재 제공할 피드백이 없습니다.',
          });
        } else {
          // 예상치 못한 응답 처리
          console.error('Unexpected response structure:', responseData);
        }
      } else {
        console.error('AnalysisFood failed:', response.status);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    } finally {
      console.log(data.feedback);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      updateTotalData();
      updateValueData();
      updateFeedback();
      return () => {
        console.log('Mainpage is unfocused');
      };
    }, [data.date])
  );

  return (
    <Container>
      <LoadingModal
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></LoadingModal>

      <CalanderBar></CalanderBar>
      <HealthScore></HealthScore>
      <GraphContainer>
        <DoughnutGraph
          value={data.kcalValue}
          total={data.kcalTotal}
        ></DoughnutGraph>
        <LineGraphContainer>
          <LineChart
            title="단백질"
            value={data.proteinValue}
            total={data.proteinTotal}
            color={theme.chartcolor1}
          ></LineChart>
          <LineChart
            title="탄수화물"
            value={data.carbohydrateValue}
            total={data.carbohydrateTotal}
            color={theme.chartcolor2}
          ></LineChart>
          <LineChart
            title="지방"
            value={data.fatValue}
            total={data.fatTotal}
            color={theme.chartcolor3}
          ></LineChart>
        </LineGraphContainer>
      </GraphContainer>
      <ScrollView>
        <Feedback text={data.feedback}></Feedback>
      </ScrollView>
    </Container>
  );
};
export default Mainpage;
