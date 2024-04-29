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
} from '../components';
import { ThemeContext } from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScrollView } from 'react-native';
import { FoodContext } from '../contexts';
import { ImageSlider } from 'react-native-image-slider-banner';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 0px;
`;
const SubmitContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const ImageSliderContainer = styled.View`
  height: 400;
`;

const AnalysisFood = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const { food, setFood: updateFoodInfo } = useContext(FoodContext);

  const imageSliderData = food.img.map((url) => ({ img: url }));

  useEffect(() => {
    console.log(food);
  });

  const _handleSignupBtnPress = () => {
    console.log(foodType, date, eatTime);
    navigation.navigate('UploadImage');
  };

  return (
    <ScrollView>
      <Container>
        <Customtext text={food.eattime}></Customtext>
        {food.img.length === 0 ? (
          <MaterialCommunityIcons name="image-plus" size={24} color="black" />
        ) : (
          <ImageSliderContainer>
            <ImageSlider
              data={imageSliderData}
              autoPlay={false}
              onItemChanged={(item) => console.log('item', item)}
              closeIconColor="white"
            />
          </ImageSliderContainer>
        )}

        <FoodAnalysisItems
          type="사진"
          foodname="치킨"
          calorie="470"
        ></FoodAnalysisItems>

        <FoodAnalysisItems
          type="글자"
          foodname="미역국"
          calorie="230"
        ></FoodAnalysisItems>

        <Button title="음식명 검색으로 추가"></Button>
        <Button title="음식명 사진으로 추가"></Button>
        <Button title="저장"></Button>
      </Container>
    </ScrollView>
  );
};
export default AnalysisFood;
