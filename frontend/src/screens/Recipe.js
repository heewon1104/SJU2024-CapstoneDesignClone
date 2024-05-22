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
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '../secret/env';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const Recipe = () => {
  const insets = useSafeAreaInsets();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = useCallback(async () => {
    const today = new Date().toISOString().slice(0, 10);
    // const url = `http://${IP_ADDRESS}:8080/api/recipe/${today}`;
    const url = `http://${IP_ADDRESS}:8080/api/recipe/2024-05-21`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await response.json();

      if (
        data.length === 0 ||
        (data.length === 1 && data[0].message === 'No Record')
      ) {
        setRecipes([]);
      } else {
        const validRecipes = data
          .filter((item) => item.rcp_nm && item.att_file_no_main)
          .map((item) => ({
            id: item.att_file_no_main,
            title: item.rcp_nm,
            url: item.att_file_no_main,
            isFocused: false,
          }));
        setRecipes(validRecipes);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setRecipes([]);
    }
    setLoading(false);
  }, [IP_ADDRESS]);

  useFocusEffect(
    useCallback(() => {
      console.log('Recipe!!');
      fetchRecipes();
    }, [fetchRecipes])
  );

  const renderRecipe = ({ item }) => (
    <RecipeContainer
      onPress={() => console.log('Recipe Pressed')}
      url={{ uri: item.url }}
      title={item.title}
      isFocused={item.isFocused}
    />
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container insets={insets}>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      ) : (
        <Text>아무것도 없습니다.</Text>
      )}
    </Container>
  );
};

export default Recipe;
