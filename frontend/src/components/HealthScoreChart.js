import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import CustomText from './CustomText'; // 임포트 이름 확인
import HorizontalLineChart from './HorizontalLineChart';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { IP_ADDRESS } from '../secret/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainPageDataContext } from '../contexts';

const Container = styled.View`
  padding: 20px 0px;
  background-color: #f3f3f3;
  border-radius: 10px;
  height: 300px;
  margin: 20px 0px;
`;

const ScoreContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
`;

const ChartContainer = styled.View`
  flex-direction: row;
  margin: 10px 0px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.scoreTitle};
  padding-left: 8px;
`;

const DetailScore = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.HealthScoreValue};
  padding-right: 40px;
`;

const HealthScoreChart = ({ isLoading, setIsLoading }) => {
  const theme = useContext(ThemeContext);
  const { data, setData: updateDataInfo } = useContext(MainPageDataContext);

  const [selectedScore, setSelectedScore] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);

  const updateMypageChartData = async () => {
    setIsLoading(true);
    const dates = Array.from({ length: 7 }, (_, i) => {
      //날짜 설정 가능!!
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    }).reverse();

    const lastDate = dates[dates.length - 1]; // 마지막 날짜를 설정
    const formattedDates = dates.map((date) => ({
      day: `${date.getMonth() + 1}/${date.getDate()}(${
        ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
      })`,
      date: date.toISOString().slice(0, 10),
      value: 0, // 초기 value 설정
      total: 100,
    }));

    console.log('Last date: ', lastDate.toISOString().slice(0, 10));

    const token = await AsyncStorage.getItem('TOKENADDRESS');
    const url = `http://${IP_ADDRESS}:8080/api/mypage/${lastDate
      .toISOString()
      .slice(0, 10)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('data : ', responseData.data);
        responseData.data.forEach((entry) => {
          const index = formattedDates.findIndex(
            (date) => date.date === entry.date
          );
          if (index !== -1) {
            const score = calculateScore(entry);
            formattedDates[index].value = score; // Calculate score and update value
          }
        });
      } else {
        console.error('AnalysisFood failed:', await response.json());
      }
    } catch (error) {
      console.error('Network or other error:', error);
    }
    setWeeklyData(formattedDates);
    console.log('Weekly! : ', formattedDates);
    setIsLoading(false);
  };

  const calculateScore = (input) => {
    const carbohydrateGap =
      (1 -
        Math.abs(data.carbohydrateTotal - input.carbohydrate_gram) /
          data.carbohydrateTotal) *
      100;
    const proteinGap =
      (1 -
        Math.abs(data.proteinTotal - input.protein_gram) / data.proteinTotal) *
      100;
    const fatGap =
      (1 - Math.abs(data.fatTotal - input.fat_gram) / data.fatTotal) * 100;
    const kcalGap =
      (1 - Math.abs(data.kcalTotal - input.energy_kcal) / data.kcalTotal) * 100;

    return Math.round((carbohydrateGap + proteinGap + fatGap + kcalGap) / 4);
  };

  useEffect(() => {
    updateMypageChartData();
  }, []);

  const handleChartClick = (value) => {
    setSelectedScore(value);
  };

  return (
    <Container>
      <ScoreContainer>
        <TitleContainer>
          <MaterialIcons
            name="medical-services"
            size={30}
            color={theme.scoreTitle}
          />
          <Title>Healthy Score</Title>
        </TitleContainer>
        <DetailScore>
          {selectedScore !== null ? `${selectedScore}점` : ''}
        </DetailScore>
      </ScoreContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ChartContainer>
          {weeklyData.map((data, index) => (
            <HorizontalLineChart
              title={data.day}
              value={data.value}
              total={data.total}
              color={data.value > 75 ? 'green' : 'red'}
              key={index}
              onPress={() => handleChartClick(data.value)}
            />
          ))}
        </ChartContainer>
      </ScrollView>
    </Container>
  );
};

export default HealthScoreChart;
