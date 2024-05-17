import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import {
  ErrorMessage,
  Customtext,
  TakePhoto,
  Button,
  CustomImageSlider,
} from '../components';
import { Image, ScrollView, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FoodContext } from '../contexts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageSlider } from 'react-native-image-slider-banner';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;
const GUIDE_TEXT = '사진 선택';

const UploadImage = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [takePhotoModal, SetTakePhotoModal] = useState(false);

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
      // navigation.navigate('AnalysisFood');
    }
  }, [food.foods]);

  const sendPostRequest = async () => {
    // const url = `http://${IP_ADDRESS}:8080/api/diet/tmpsave`;
    // const token = await AsyncStorage.getItem('TOKENADDRESS');
    // console.log('Session :', token);
    // const formData = new FormData();
    // // 이미지 추가
    // food.img.forEach((imageUri) => {
    //   const name = imageUri.split('/').pop();
    //   const type = 'image/png'; // 실제 이미지 유형에 맞게 조정 가능
    //   const file = {
    //     uri: imageUri,
    //     name,
    //     type,
    //   };
    //   formData.append('foodImages', file);
    // });
    // // 요청 JSON 추가
    // const jsonBody = {
    //   dietType: food.eattime,
    //   koreanOrAll: food.type,
    //   intakeTime: food.date,
    // };
    // formData.append('request', JSON.stringify(jsonBody));
    // console.log(jsonBody);
    // try {
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `${token}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     const resultData = await response.json();
    //     const foodItems = resultData.map((item) => item.food);
    //     updateFoodInfo({
    //       foods: [...foodItems],
    //       request: [...resultData],
    //     });
    //   } else {
    //     console.error('Server response error:', response.status);
    //   }
    // } catch (error) {
    //   console.error('Error sending post request:', error);
    // }

    navigation.navigate('AnalysisFood');
  };

  const _handleBtnPress = () => {
    navigation.navigate('AnalysisFood');
  };

  const imageSliderData = food.img.map((url) => ({ img: url }));

  return takePhotoModal ? (
    <TakePhoto
      checkModal={SetTakePhotoModal}
      setImages={(newImages) => updateFoodInfo({ img: newImages })}
      currentImages={food.img}
    />
  ) : (
    <Container>
      <Customtext text={GUIDE_TEXT} />
      <CustomImageSlider></CustomImageSlider>
      <Button title="갤러리에서 사진 선택" onPress={pickImage} />
      <Button
        title="카메라로 사진 촬영"
        onPress={() => SetTakePhotoModal(true)}
      />
      <ErrorMessage message={errorMessage} />
      <Button title="업로드" onPress={_handleBtnPress} disabled={disabled} />
    </Container>
  );
};

export default UploadImage;
