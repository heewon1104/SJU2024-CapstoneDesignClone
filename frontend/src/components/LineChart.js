import React from 'react';
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
  color: gray;
`;

const Total = styled.View`
  width: 150;
  height: 10;
  background-color: #f1f1f1;
  align-items: flex-start;
  border-radius: 8px;
`;

const Item = styled.View`
  width: 80;
  height: 10;
  background-color: red;
  border-radius: 8px;
`;

const LineChart = () => {
  return (
    <Container>
      <TextContainer>
        <Title>단백질</Title>
        <Detail>60/100</Detail>
      </TextContainer>
      <Total>
        <Item></Item>
      </Total>
    </Container>
  );
};

export default LineChart;
