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
import Markdown from 'react-native-markdown-display';

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

const RecipeDetail = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const { recipe } = route.params;

  useEffect(() => {
    console.log('디버깅 :', recipe);
  }, []);

  return (
    <ScrollView>
      <Container>
        <Image
          source={{
            uri: recipe.url,
          }}
          width={width}
        />
        <TitleContainer>
          <Customtext text={recipe.title} fontsize={20}></Customtext>
          <TouchableOpacity onPress={() => SetTakePhotoModal(true)}>
            <ButtonContainer>
              <ButtonTitle>{recipe.type}</ButtonTitle>
            </ButtonContainer>
          </TouchableOpacity>
        </TitleContainer>
        <Customtext text="재료" fontsize={20}></Customtext>
        {/* <Customtext
          text={recipe.ingredient}
          fontsize={16}
          color="grey"
          margin="0"
        ></Customtext> */}
        {/* <Markdown>{recipe.ingredient}</Markdown> */}

        <Markdown>{recipe.ingredient}</Markdown>
        <Customtext text="" fontsize={20} margin="0"></Customtext>
        <Customtext text="조리 방법" fontsize={20}></Customtext>
        {recipe.manual01 !== '' && (
          <CookingProcessItem
            order="1"
            detail={recipe.manual01}
            url={recipe.manual_img01}
          />
        )}
        {recipe.manual02 !== '' && (
          <CookingProcessItem
            order="2"
            detail={recipe.manual02}
            url={recipe.manual_img02}
          />
        )}
        {recipe.manual03 !== '' && (
          <CookingProcessItem
            order="3"
            detail={recipe.manual03}
            url={recipe.manual_img03}
          />
        )}
        {recipe.manual04 !== '' && (
          <CookingProcessItem
            order="4"
            detail={recipe.manual04}
            url={recipe.manual_img04}
          />
        )}
        {recipe.manual05 !== '' && (
          <CookingProcessItem
            order="5"
            detail={recipe.manual05}
            url={recipe.manual_img05}
          />
        )}
        {recipe.manual06 !== '' && (
          <CookingProcessItem
            order="6"
            detail={recipe.manual06}
            url={recipe.manual_img06}
          />
        )}

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
