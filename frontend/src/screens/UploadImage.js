import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { ErrorMessage, Customtext, TakePhoto, Button } from '../components';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
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
    <ScrollView>
      <Container>
        <Customtext text={GUIDE_TEXT} />
        {food.img.length === 0 ? (
          <MaterialCommunityIcons name="image-plus" size={24} color="black" />
        ) : (
          <View style={styles.imageSliderContainer}>
            <ImageSlider
              data={imageSliderData}
              autoPlay={false}
              onItemChanged={(item) => console.log('item', item)}
              closeIconColor="white"
            />
          </View>
        )}
        <Button title="갤러리에서 사진 선택" onPress={pickImage} />
        <Button
          title="카메라로 사진 촬영"
          onPress={() => SetTakePhotoModal(true)}
        />
        <ErrorMessage message={errorMessage} />
        <Button title="업로드" onPress={_handleBtnPress} disabled={disabled} />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  imageSliderContainer: {
    height: 400,
  },
});

export default UploadImage;
