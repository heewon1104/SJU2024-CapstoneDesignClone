import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { BoyImage, GirlImage } from '../../assets/components';
import { Customcardbutton } from './index';

const Cardcontainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 10px;
`;

const FoodRadiobuttonContainer = ({ foodType, setFoodType }) => {
  return (
    <Cardcontainer>
      <Customcardbutton
        onPress={() => setFoodType('한식')}
        url={BoyImage}
        title="한식"
        isFocused={foodType === '한식'}
      ></Customcardbutton>
      <Customcardbutton
        onPress={() => setFoodType('세계음식')}
        url={GirlImage}
        title="세계음식"
        isFocused={foodType === '세계음식'}
      ></Customcardbutton>
    </Cardcontainer>
  );
};

export default FoodRadiobuttonContainer;
