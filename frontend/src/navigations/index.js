import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import Main from './Main';
import { UserLoginInfoContext } from '../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';

const Navigations = () => {
  const tokenInfo = useContext(UserLoginInfoContext);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const getData = async () => {
      console.log('loading22');
      try {
        const storedValue = await AsyncStorage.getItem('TA223344');
        console.log(storedValue);
        setValue(storedValue);
        console.log(tokenInfo.userTokenCheck);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <NavigationContainer>
      {tokenInfo.userTokenCheck === true || value != null ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};

export default Navigations;
