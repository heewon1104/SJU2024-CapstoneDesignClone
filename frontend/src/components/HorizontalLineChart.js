import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;
const ChartContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 15;
  font-weight: 600;
  text-align: center;
  padding: 10px;
`;
const Total = styled.View`
  width: 20;
  height: 150;
  /* background-color: ${({ theme }) => theme.chartBackground}; */
  background-color: grey;
  align-items: flex-start;
  border-radius: 8px;
  justify-content: flex-end;
`;

const Item = styled.View`
  width: 20;
  height: ${(props) => props.height}%;
  background-color: ${(props) => props.color};
  border-radius: 8px;
`;

const HorizontalLineChart = ({ onPress, title, value, total, color }) => {
  const heightPercent = Math.min((value / total) * 100, 100);
  const isOver = value > total;

  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <ChartContainer>
          <Total>
            <Item color={color} height={heightPercent}></Item>
          </Total>
        </ChartContainer>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default HorizontalLineChart;
