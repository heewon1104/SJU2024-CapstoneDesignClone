import React from 'react';
import styled from 'styled-components/native';
const Container = styled.View`
  margin: 10px 20px;
`;
const ChartContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 20;
  font-weight: 600;
`;
const Detail = styled.Text`
  font-size: 12;
  font-weight: 600;
  color: ${({ theme, isOver }) =>
    isOver ? theme.exceedValueDetail : theme.chartValueDetail};
`;

const Total = styled.View`
  width: 20;
  height: 150;
  background-color: ${({ theme }) => theme.chartBackground};
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

const HorizontalLineChart = ({ title, value, total, color }) => {
  const heightPercent = Math.min((value / total) * 100, 100);
  const isOver = value > total;

  return (
    <Container>
      <ChartContainer>
        <Total>
          <Item color={color} height={heightPercent}></Item>
        </Total>
      </ChartContainer>
      <Title>{title}</Title>
    </Container>
  );
};

export default HorizontalLineChart;
