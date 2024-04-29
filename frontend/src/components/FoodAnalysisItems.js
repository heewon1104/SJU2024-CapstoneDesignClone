import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

const Container = styled.View`
  margin-bottom: 10px;
  width: 80%;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: 15px 10px;
  border: 3px solid ${({ theme }) => theme.borderColor};
  border-color: ${({ theme }) => theme.borderColor};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
const TextContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;

  border: 3px solid ${({ theme }) => theme.borderColor};
  border-top-width: 0px;
  padding: 5px 10px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Text = styled.Text`
  padding-left: 10px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text};
`;

const EditBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.editBtnBackground};
  padding: 5px 15px;
  border-radius: 20px;
`;

const BtnText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.editBtnColor};
`;

const FoodAnalysisItems = ({ type, foodname, calorie }) => {
  useEffect(() => {
    console.log(type, foodname, calorie);
    console.log(type === '사진');
  });
  return (
    <Container>
      <TitleContainer>
        <TextContainer>
          {type === '사진' ? (
            <Entypo name="image-inverted" size={36} color="black" />
          ) : (
            <Ionicons name="text" size={30} color="black" />
          )}
          <Text>{foodname}</Text>
        </TextContainer>
        <Text>{calorie} kcal</Text>
      </TitleContainer>
      <ButtonContainer>
        <EditBtn>
          <BtnText>수정</BtnText>
        </EditBtn>
      </ButtonContainer>
    </Container>
  );
};

export default FoodAnalysisItems;
