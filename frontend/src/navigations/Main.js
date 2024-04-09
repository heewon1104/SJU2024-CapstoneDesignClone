import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Mainpage,
  Recipe,
  Refrigerator,
  Calander,
  Signin,
} from '../screens/index';
import { Entypo, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#5DB075',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Mainpage"
        component={Mainpage}
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Calander"
        component={Calander}
        options={{
          title: '캘린더',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="calendar" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Signin"
        component={Signin}
        options={{
          title: '카메라',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="camera" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Refrigerator"
        component={Refrigerator}
        options={{
          title: '냉장고',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="box" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{
          title: '레시피',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Main;
