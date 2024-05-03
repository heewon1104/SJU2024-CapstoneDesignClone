import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { KoreanFood, WesternFood } from '../../assets/components';
import { Customcardbutton } from './index';

const Cardcontainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  margin-bottom: 10px;
`;

const FoodRadiobuttonContainer = ({ foodType, setFoodType }) => {
  return (
    <Cardcontainer>
      <Customcardbutton
        onPress={() => setFoodType('KOREAN')}
        url={KoreanFood}
        title="한식"
        isFocused={foodType === 'KOREAN'}
      ></Customcardbutton>
      <Customcardbutton
        onPress={() => setFoodType('ALL')}
        url={WesternFood}
        title="세계음식"
        isFocused={foodType === 'ALL'}
      ></Customcardbutton>
    </Cardcontainer>
  );
};

export default FoodRadiobuttonContainer;
