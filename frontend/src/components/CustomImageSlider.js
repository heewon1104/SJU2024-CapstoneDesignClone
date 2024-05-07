import React, { useContext } from 'react';
import { FoodContext } from '../contexts';
import { ImageSlider } from 'react-native-image-slider-banner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  margin: 20px 0px;
  background-color: white;
  height: 300px;
`;

const CustomImageSlider = () => {
  const { food, setFood: updateFoodInfo } = useContext(FoodContext);

  const imageSliderData = food.img.map((url) => ({ img: url }));

  return (
    <Container>
      {food.img.length === 0 ? (
        <MaterialCommunityIcons name="image-plus" size={100} color="grey" />
      ) : (
        <ImageSlider
          data={imageSliderData}
          preview={false}
          autoPlay={false}
          onItemChanged={(item) => console.log('item', item)}
          closeIconColor="white"
          resizeMode="cover" // 이미지 비율 유지를 위해 추가
        />
      )}
    </Container>
  );
};

export default CustomImageSlider;
