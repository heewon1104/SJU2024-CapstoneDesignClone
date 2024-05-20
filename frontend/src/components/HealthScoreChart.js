import { React, useContext } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import HorizontalLineChart from './HorizontalLineChart';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

const Container = styled.View`
  padding: 10px 0px;
`;

const ChartContainer = styled.View`
  flex-direction: row;
  align-content: space-between;
  justify-content: space-between;
  background-color: lightgrey;
  height: 200px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-content: center;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.scoreTitle};
  padding-left: 8px;
`;

const HealthScoreChart = () => {
  const theme = useContext(ThemeContext);

  // 일주일치 데이터 예시
  const weeklyData = [
    { day: '월', value: 80, total: 100 },
    { day: '화', value: 75, total: 100 },
    { day: '수', value: 60, total: 100 },
    { day: '목', value: 90, total: 100 },
    { day: '금', value: 95, total: 100 },
    { day: '토', value: 50, total: 100 },
    { day: '일', value: 65, total: 100 },
  ];

  return (
    <Container>
      <TitleContainer>
        <MaterialIcons
          name="medical-services"
          size={24}
          color={theme.scoreTitle}
        />
        <Title>Healthy Score</Title>
      </TitleContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ChartContainer>
          {weeklyData.map((data, index) => (
            <HorizontalLineChart
              key={index}
              title={data.day}
              value={data.value}
              total={data.total}
              color={data.value > 75 ? 'green' : 'red'} // 값에 따라 색상 결정
            />
          ))}
        </ChartContainer>
      </ScrollView>
    </Container>
  );
};

export default HealthScoreChart;
