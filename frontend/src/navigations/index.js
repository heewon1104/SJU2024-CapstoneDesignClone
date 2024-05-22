import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import Main from './Main';
import { UserLoginInfoContext } from '../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

const Navigations = () => {
  const tokenInfo = useContext(UserLoginInfoContext);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const getData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('TOKENADDRESS');
        if (storedValue) {
          setValue(storedValue);
          tokenInfo.setuserTokenCheck(true); // 토큰이 있다면 로그인 상태를 true로 설정
        }
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
      } catch (e) {
        console.error('Failed to fetch token from AsyncStorage:', e);
        setLoading(false); // 오류가 발생해도 로딩 상태를 false로 설정
      }
    };

    AsyncStorage.clear();
    getData();
  }, []);

  if (loading) {
    // 로딩 중이면 로딩 인디케이터 표시
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      {tokenInfo.userTokenCheck || value ? <Main /> : <Auth />}
      {/* <Main></Main> */}
    </NavigationContainer>
  );
};

export default Navigations;
