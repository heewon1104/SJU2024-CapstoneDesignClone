import React from 'react';
import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Container = styled.View`
  width: 90%;
  justify-content: center;
  background-color: grey;
  padding: ${Platform.OS == 'android' ? '10px 0px' : '10px 5px'};
`;

const TitleContainer = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  font-size: ${Platform.OS == 'android' ? '16px' : '20px'};
  font-weight: 600;
  margin-left: 10px;
  color: ${(props) => props.color};
`;
const FoodType = styled.Text`
  margin-left: 20px;
  font-size: ${Platform.OS == 'android' ? '14px' : '18px'};
  font-weight: 600;
  padding: ${Platform.OS == 'android' ? '0px' : '5px'};
`;
const CalorieContainer = styled.View`
  align-items: flex-end;
`;
const Calorie = styled.Text`
  padding-right: 20px;
  font-size: ${Platform.OS == 'android' ? '14px' : '18px'};
  font-weight: 600;
`;

const MealTypeListItem = ({ title, foodtype, calorie, color }) => {
  return (
    <Container>
      <TitleContainer>
        <Octicons name="dot" size={24} color={color} />
        <Title color={color}>{title}</Title>
      </TitleContainer>
      <FoodType>{foodtype}</FoodType>
      <CalorieContainer>
        <Calorie>{calorie}Kcal</Calorie>
      </CalorieContainer>
    </Container>
  );
};

export default MealTypeListItem;
