import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import Main from './Main';

const Navigations = () => {
  return (
    <NavigationContainer>
      {/* <Auth></Auth> */}
      <Main></Main>
    </NavigationContainer>
  );
};
export default Navigations;
