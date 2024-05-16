import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeContext } from 'styled-components/native';
import {
  Mainpage,
  Recipe,
  Refrigerator,
  Calander,
  Signin,
} from '../screens/index';
import { Entypo, AntDesign } from '@expo/vector-icons';
import CameraRecord from './CameraRecord';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

const Main = () => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.main,
        inactiveTintColor: theme.detail,
      }}
    >
      <Tab.Screen
        name="Mainpage"
        component={Mainpage}
        options={{
          headerShown: Platform.OS === 'android' ? false : true,
          title: '홈',
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Calander"
        component={Calander}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
          title: '캘린더',
          tabBarIcon: ({ color }) => (
            <Entypo name="calendar" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Camera"
        component={CameraRecord}
        options={{
          title: '카메라',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="camera" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Refrigerator"
        component={Refrigerator}
        options={{
          title: '냉장고',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: ({ color }) => (
            <Entypo name="box" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{
          title: '레시피',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="book" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Main;
