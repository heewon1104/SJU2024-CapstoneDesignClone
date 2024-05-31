import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  RecipeContainer,
  CookingProcessItem,
  SaleItem,
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '../secret/env';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';

import Image1 from '../../assets/components/examples/1.png';
import Image2 from '../../assets/components/examples/2.png';
import Image3 from '../../assets/components/examples/3.png';
import Image4 from '../../assets/components/examples/4.png';

const Container = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const Image = styled.Image`
  height: ${({ width }) => width - 150}px;
  width: ${({ width }) => width - 150}px;
  border-radius: 10px;
`;
const TitleContainer = styled.View`
  width: 90%;
  align-items: flex-start;
  margin-bottom: 20px;
`;
const ButtonContainer = styled.View`
  background-color: #5db075;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 10px;
`;
const ButtonTitle = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

const RecipeDetail = ({ navigation }) => {
  const { width } = useWindowDimensions();

  return (
    <ScrollView>
      <Container>
        <Image
          source={{
            uri: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00036_1.png',
          }}
          width={width}
        />
        <TitleContainer>
          <Customtext
            text="저염 된장으로 맛을 낸 황태해장국 "
            fontsize={20}
          ></Customtext>
          <TouchableOpacity onPress={() => SetTakePhotoModal(true)}>
            <ButtonContainer>
              <ButtonTitle>국&찌개</ButtonTitle>
            </ButtonContainer>
          </TouchableOpacity>
        </TitleContainer>

        <Customtext text="재료" fontsize={20}></Customtext>
        <Customtext
          text="황태해장국 황태(채) 15g(10개), 콩나물 30g(1/6봉지), 무 30g(5×3×2cm), 저염된장 10g(2작은술), 물 300ml(1½컵), 청양고추 5g(1/2개), 다진 마늘 2g(1/3작은술)"
          fontsize={16}
          color="grey"
          margin="0"
        ></Customtext>

        <Customtext text="" fontsize={20} margin="0"></Customtext>

        <Customtext text="조리 방법" fontsize={20}></Customtext>
        <CookingProcessItem
          order="1"
          detail="황태는 손질하여 물에 헹궈 건져 놓고 콩나물은 다듬어 씻고 청양고추는 어슷썰기 한다."
          url="http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00036_3.png"
        ></CookingProcessItem>
        <CookingProcessItem
          order="2"
          detail="냄비에 물을 붓고 황태와 무를 넣고 끓인 후 육수에서 물을 건져내고 저염 된장을 푼다."
          url="http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00036_4.png"
        ></CookingProcessItem>
        <CookingProcessItem
          order="3"
          detail="콩나물, 다진 마늘, 청양고추를 넣고 뚜껑을 덮어 김이 나게 끓 여준다."
          url="http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00036_5.png"
        ></CookingProcessItem>

        <Customtext text="" fontsize={20} margin="0"></Customtext>
        <Customtext text="이 재료를 찾으시나요?" fontsize={20}></Customtext>
        <ScrollView horizontal>
          <SaleItem
            title="해맑은푸드 대용량 황태채 실속형 (냉동), 500g, 1개"
            price="19800원"
            url={Image1}
          ></SaleItem>
          <SaleItem
            title="콩나물 1kg 산소콩나물 무농약 친환경 국산콩, 1kg, 1개"
            price="5800원"
            url={Image2}
          ></SaleItem>
          <SaleItem
            title="국내산 무, 1개입, 1개"
            price="1760원"
            url={Image3}
          ></SaleItem>
          <SaleItem
            title="대상 청정원 미소된장 가쓰오&다시마, 450g, 1개"
            price="7470원"
            url={Image4}
          ></SaleItem>
        </ScrollView>
      </Container>
    </ScrollView>
  );
};

export default RecipeDetail;
