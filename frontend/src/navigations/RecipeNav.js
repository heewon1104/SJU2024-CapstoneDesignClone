import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Recipe, RecipeDetail } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const RecipeNav = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="Recipe"
        component={Recipe}
        options={{
          title: '추천 레시피',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold ',
            fontSize: 22,
          },
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={{
          title: '추천 레시피',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold ',
            fontSize: 22,
          },
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            ></MaterialIcons>
          ),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RecipeNav;
