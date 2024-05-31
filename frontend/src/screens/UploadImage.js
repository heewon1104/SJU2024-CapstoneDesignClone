import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import {
  ErrorMessage,
  Customtext,
  TakePhoto,
  Button,
  CustomImageSlider,
  LoadingModal,
} from '../components';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FoodContext } from '../contexts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageSlider } from 'react-native-image-slider-banner';
import { IP_ADDRESS } from '../secret/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';

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
const GUIDE_TEXT = '사진 선택';

const UploadImage = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [takePhotoModal, SetTakePhotoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { food, setFood: updateFoodInfo } = useContext(FoodContext);

  useEffect(() => {
    console.log(food);
    setDisabled(food.img.length === 0 || !!errorMessage);
  }, [food.img, errorMessage]);

  useEffect(() => {
    setErrorMessage(food.img.length === 0 ? '사진을 선택해주세요' : '');
  }, [food.img]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      updateFoodInfo({
        img: [...food.img, ...result.assets.map((asset) => asset.uri)],
      });
    }
  };

  useEffect(() => {
    if (food.foods.length > 0) {
      console.log('Updated foods after update:', food.foods);
      navigation.navigate('AnalysisFood');
    }
  }, [food.foods]);

  const sendPostRequest = async () => {
    setIsLoading(true);
    const url = `http://${IP_ADDRESS}:8080/api/diet/tmpsave`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    console.log('Session :', token);

    const formData = new FormData();

    // 이미지 추가
    food.img.forEach((imageUri) => {
      const name = imageUri.split('/').pop();
      const type = 'image/png';
      const file = {
        uri: imageUri,
        name,
        type,
      };
      formData.append('foodImages', file);
    });

    // 요청 JSON 추가
    const jsonBody = {
      dietType: food.eattime,
      koreanOrAll: food.type,
      intakeTime: food.date,
    };
    formData.append('request', JSON.stringify(jsonBody));

    console.log(jsonBody);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const resultData = await response.json();
        const foodItems = resultData.map((item) => item.food);

        updateFoodInfo({
          //food_be
          foods: [...foodItems],
          request: [...resultData],
        });
      } else {
        console.error('Server response error:', response.status);
      }
    } catch (error) {
      console.error('Error sending post request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const _handleBtnPress = () => {
    sendPostRequest();
  };

  return takePhotoModal ? (
    <TakePhoto
      checkModal={SetTakePhotoModal}
      setImages={(newImages) => updateFoodInfo({ img: newImages })}
      currentImages={food.img}
    />
  ) : (
    <Container>
      <LoadingModal
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></LoadingModal>
      <Customtext text={GUIDE_TEXT} />
      <CustomImageSlider></CustomImageSlider>

      <SubmitContainer>
        <TouchableOpacity onPress={() => SetTakePhotoModal(true)}>
          <ButtonContainer>
            <ButtonTitle>카메라로 사진 촬영</ButtonTitle>
          </ButtonContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <ButtonContainer>
            <ButtonTitle>갤러리에서 사진 선택</ButtonTitle>
          </ButtonContainer>
        </TouchableOpacity>
      </SubmitContainer>

      {errorMessage === '사진을 선택해주세요' && (
        <ErrorMessage message={errorMessage} />
      )}
      <Button title="업로드" onPress={_handleBtnPress} disabled={disabled} />
    </Container>
  );
};

export default UploadImage;
