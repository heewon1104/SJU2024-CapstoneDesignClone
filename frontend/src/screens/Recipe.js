import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RecipeContainer, TextBox, LoadingModal } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '../secret/env';
import { FontAwesome } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #5db075;
`;

const FullScreenCenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  background-color: #f3f3f3;
  border-radius: 20px;
  height: ${({ height }) => height - 330}px;
  width: ${({ width }) => width - 100}px;
`;

const TmpView = styled.View`
  flex-direction: row;
`;

const Recipe = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [recipes, setRecipes] = useState([]);
  const [instruction, setInstruction] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    const todaydate = new Date().toISOString().split('T')[0];
    const url = `http://${IP_ADDRESS}:8080/api/recipe/${todaydate}`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await response.json();

      console.log('api response : ', data);

      if (
        data.length === 0 ||
        (data.length === 1 && data[0].message === 'No Record')
      ) {
        setRecipes([]);
      } else {
        const validRecipes = data
          .filter((item) => item.rcp_nm && item.att_file_no_main)
          .map((item) => ({
            id: item.id,
            title: item.rcp_nm,
            url: item.att_file_no_main,
            ingredient: item.rcp_parts_dtls,
            explanation: item.rcp_na_tip,

            manual01: item.manual01,
            manual02: item.manual02,
            manual03: item.manual03,
            manual04: item.manual04,
            manual05: item.manual05,
            manual06: item.manual06,

            manual_img01: item.manual_img01,
            manual_img02: item.manual_img02,
            manual_img03: item.manual_img03,
            manual_img04: item.manual_img04,
            manual_img05: item.manual_img05,
            manual_img06: item.manual_img06,

            type: item.rcp_pat2,
            cooking_method: item.rcp_way2,

            isFocused: false,
          }));
        // setRecipes((prevRecipes) => [
        //   ...prevRecipes,
        //   {
        //     id: 'static-1',
        //     title: '저염 된장으로 맛을 낸 황태해장국',
        //     url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00036_1.png',
        //     isFocused: false,
        //   },
        // ]);
        setRecipes((prevRecipes) => [...prevRecipes, ...validRecipes]); // 이전 데이터에 추가
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setRecipes([]);
    }
    setIsLoading(false);
  }, [IP_ADDRESS]);

  const updateInstructionData = useCallback(async () => {
    const url = `http://${IP_ADDRESS}:8080/api/mypage/instruction`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setInstruction(responseData.instruction);
        console.log('Instruction data fetched successfully', responseData);
      } else {
        console.error(
          'Failed to fetch instruction data:',
          await response.json()
        );
      }
    } catch (error) {
      console.error('Network or other error:', error);
    }
  }, [IP_ADDRESS]);

  useFocusEffect(
    useCallback(() => {
      console.log('saddadasdasdasddas', recipes);
      setRecipes([]);
      fetchRecipes();
      updateInstructionData();
    }, [fetchRecipes, updateInstructionData])
  );

  const renderRecipe = ({ item }) => (
    <RecipeContainer
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      url={{ uri: item.url }}
      title={item.title}
      isFocused={item.isFocused}
    />
  );

  return (
    <Container insets={insets}>
      <LoadingModal
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></LoadingModal>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <FullScreenCenteredView onTouchEnd={() => setModalVisible(false)}>
          <ModalContainer width={width} height={height}>
            <ScrollView>
              <TextBox
                title="우리는 이런걸 고려하고 있어요!"
                explanation={instruction}
                titleColor="#5DB075"
              />
            </ScrollView>
          </ModalContainer>
        </FullScreenCenteredView>
      </Modal>

      <TextContainer>
        <Title>우리는 이런걸 고려하고 추천했어요! </Title>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome name="question-circle" size={26} color="#5DB075" />
        </TouchableOpacity>
      </TextContainer>

      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <Text>오늘 식사 기록을 추가하고 레시피를 추천 받으세요!</Text>
      )}
    </Container>
  );
};

export default Recipe;
