import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  RecipeContainer,
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

const Container = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Recipe = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);

  // 레시피 데이터를 배열 형태로 정의
  const recipes = [
    {
      id: '1',
      title: '새우 두부 계란찜',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00028_2.png',
      isFocused: false,
    },
    {
      id: '2',
      title: '부추 콩가루 찜',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00029_2.png',
      isFocused: false,
    },
    {
      id: '3',
      title: '방울 토마토 소박이',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00031_2.png',
      isFocused: false,
    },
    {
      id: '4',
      title: '순두부 사과 소스 오이무침',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00032_2.png',
      isFocused: false,
    },
    {
      id: '5',
      title: '사과 새우 북엇국',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00033_2.png',
      isFocused: false,
    },
    {
      id: '6',
      title: '저염 된장으로 맛을 낸 황태해장국',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00036_2.png',
      isFocused: false,
    },
    {
      id: '7',
      title: '된장국',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00037_2.png',
      isFocused: false,
    },
    {
      id: '8',
      title: '표고버섯 청경채 국',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00038_2.png',
      isFocused: false,
    },
    {
      id: '9',
      title: '치커리샐러드와 올리브 마늘 소스',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00095_2.png',
      isFocused: false,
    },
    {
      id: '10',
      title: '시금치 우유 소스와 그린매쉬드포테이토',
      url: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00089_2.png',
      isFocused: false,
    },
  ];

  // 레시피 카드 렌더링 함수
  const renderRecipe = ({ item }) => (
    <RecipeContainer
      onPress={() => console.log('Recipe Pressed')}
      url={{ uri: item.url }} // URL을 객체 형태로 감싸줍니다.
      title={item.title}
      isFocused={item.isFocused}
    />
  );

  return (
    <Container insets={insets}>
      <Customtext text="사용자 추천 레시피"></Customtext>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        numColumns={2} // 가로로 2개씩 표시
      />
    </Container>
  );
};

export default Recipe;
