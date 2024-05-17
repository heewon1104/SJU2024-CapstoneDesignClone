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

const AnalysisFood = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const { food, setFood: updateFoodInfo } = useContext(FoodContext);

  useEffect(() => {
    console.log(food);
  });

  const _handleSignupBtnPress = async () => {
    // const url = `http://${IP_ADDRESS}:8080/api/diet/save`;
    // const token = await AsyncStorage.getItem('TOKENADDRESS');

    // const payload = food.request;
    // console.table('Payload to be sent:', payload);

    // try {
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   const statusRes = await response.status;

    //   if (response.ok) {
    //     console.log('AnalysisFood successful', statusRes);
    //   } else {
    //     console.error('AnalysisFood failed:', statusRes);
    //   }
    // } catch (error) {
    //   console.error('Network or other error:', error);
    // }

    if (navigation.canGoBack()) {
      navigation.popToTop();
      navigation.navigate('Mainpage');
    } else {
      console.warn('No screens to pop back to.');
    }
  };

  return (
    <ScrollView>
      <Container>
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
        <Button
          title="음식명 검색으로 추가"
          onPress={() => console.log('search')}
        ></Button>
        <Button
          title="음식명 사진으로 추가"
          onPress={() => console.log('image')}
        ></Button>
        <Button title="저장" onPress={_handleSignupBtnPress}></Button>
      </Container>
    </ScrollView>
  );
};
export default AnalysisFood;
