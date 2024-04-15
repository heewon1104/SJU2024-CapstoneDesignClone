import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  margin: 0px 10px;
`;
const TextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
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
  width: 150;
  height: 10;
  background-color: ${({ theme }) => theme.chartBackground};
  align-items: flex-start;
  border-radius: 8px;
`;

const Item = styled.View`
  width: ${(props) => props.width}%;
  height: 10;
  background-color: ${(props) => props.color};
  border-radius: 8px;
`;

const LineChart = ({ title, value, total, color }) => {
  const widthPercent = Math.min((value / total) * 100, 100);
  const isOver = value > total;

  return (
    <Container>
      <TextContainer>
        <Title>{title}</Title>
        <Detail isOver={isOver}>
          {value}/{total}
        </Detail>
      </TextContainer>
      <Total>
        <Item color={color} width={widthPercent}></Item>
      </Total>
    </Container>
  );
};

export default LineChart;
