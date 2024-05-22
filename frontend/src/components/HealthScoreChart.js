import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import Customtext from './CustomText';
import HorizontalLineChart from './HorizontalLineChart';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

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
const HealthScoreChart = () => {
  const theme = useContext(ThemeContext);
  const [selectedScore, setSelectedScore] = useState(null);

  // 일주일치 데이터 예시
  const weeklyData = [
    { day: '12/8(목)', value: 80, total: 100 },
    { day: '12/9(금)', value: 75, total: 100 },
    { day: '12/10(토)', value: 60, total: 100 },
    { day: '12/11(일)', value: 90, total: 100 },
    { day: '12/12(월)', value: 95, total: 100 },
    { day: '12/13(화)', value: 50, total: 100 },
    { day: '12/14(수)', value: 65, total: 100 },
  ];

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

        <DetailScore>{selectedScore !== null && selectedScore}점 </DetailScore>
      </ScoreContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ChartContainer>
          {weeklyData.map((data, index) => (
            <HorizontalLineChart
              title={data.day}
              value={data.value}
              total={data.total}
              color={data.value > 75 ? 'green' : 'red'} // 값에 따라 색상 결정
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
