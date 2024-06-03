import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Mascot } from '../../assets/components';
import { MainPageDataContext } from '../contexts';

const Container = styled.View`
  align-content: space-between;
  justify-content: space-between;
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 15px;
`;

const Title = styled.Text`
  color: ${({ titleColor }) => titleColor};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
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
