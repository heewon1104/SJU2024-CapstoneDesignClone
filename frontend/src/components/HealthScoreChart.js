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
  height: 240px;
  margin: 10px 0px;
  border-radius: 10px;
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

const HealthScoreChart = () => {
  const theme = useContext(ThemeContext);

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

  return (
    <Container>
      <TitleContainer>
        <MaterialIcons
          name="medical-services"
          size={30}
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
