import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Mascot } from '../../assets/components';
import { MainPageDataContext } from '../contexts';

const Container = styled.View`
  align-content: space-between;
  justify-content: space-between;
  background-color: lightgray;
  border-radius: 10px;
`;

const Title = styled.Text`
  color: ${({ titleColor }) => titleColor};
  font-size: 20px;
`;
const Explanation = styled.Text`
  color: gray;
  font-size: 14px;
`;

const TextBox = ({ title, explanation, titleColor }) => {
  return (
    <Container>
      <Title titleColor={titleColor}>{title}</Title>
      <Explanation>{explanation}</Explanation>
    </Container>
  );
};

export default TextBox;
