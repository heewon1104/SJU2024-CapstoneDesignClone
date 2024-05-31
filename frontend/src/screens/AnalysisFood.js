import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import {
  Input,
  ErrorMessage,
  Customtext,
  Button,
  FoodRadiobuttonContainer,
  InputButton,
  FoodAnalysisItems,
  CustomImageSlider,
  LoadingModal,
} from '../components';
import { ThemeContext } from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScrollView, TouchableOpacity } from 'react-native';
import { FoodContext } from '../contexts';
import { ImageSlider } from 'react-native-image-slider-banner';
import { IP_ADDRESS } from '../secret/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;
const SubmitContainer = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px 10px 0px;
`;
const ButtonContainer = styled.View`
  background-color: lightgray;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 15px 5px;
`;
const ButtonTitle = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: 600;
`;

const AnalysisFood = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const { food, setFood: updateFoodInfo } = useContext(FoodContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('디버깅1 :', food.foods);
    console.log('디버깅2 :', food.request);
  });

  const _handleSignupBtnPress = async () => {
    setIsLoading(true);
    const url = `http://${IP_ADDRESS}:8080/api/diet/save`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    const payload = food.request;
    console.table('Payload to be sent:', payload);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const statusRes = await response.status;

      if (response.ok) {
        console.log('AnalysisFood successful', statusRes);
      } else {
        console.error('AnalysisFood failed:', statusRes);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    } finally {
      setIsLoading(false);
    }

    navigation.navigate('Mainpage');
  };

  return (
    <ScrollView>
      <Container>
        <LoadingModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        ></LoadingModal>

        <Customtext text={food.eattime}></Customtext>
        <CustomImageSlider></CustomImageSlider>

        {food.foods.map((foodName, index) => (
          <FoodAnalysisItems
            key={index}
            type="사진"
            foodname={foodName}
            calorie="100"
          />
        ))}

        {/* <FoodAnalysisItems
          type="사진"
          foodname="치킨"
          calorie=""
        ></FoodAnalysisItems>

        <FoodAnalysisItems
          type="글자"
          foodname="미역국"
          calorie=""
        ></FoodAnalysisItems> */}

        <SubmitContainer>
          <TouchableOpacity onPress={() => console.log('search')}>
            <ButtonContainer>
              <ButtonTitle>음식명 검색으로 추가</ButtonTitle>
            </ButtonContainer>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('search')}>
            <ButtonContainer>
              <ButtonTitle>음식명 사진으로 추가</ButtonTitle>
            </ButtonContainer>
          </TouchableOpacity>
        </SubmitContainer>
        <Button title="저장" onPress={_handleSignupBtnPress}></Button>
      </Container>
    </ScrollView>
  );
};
export default AnalysisFood;
