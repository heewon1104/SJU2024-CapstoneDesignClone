import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
  background-color: ${({ theme }) => theme.cardBackground};
  justify-content: center;
  align-items: center;
`;
const Image = styled.Image`
  background-color: ${({ theme }) => theme.cardBackground};
  width: 100px;
  height: 100px;
`;
const Text = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.cardTitle};
`;

const Customcardbutton = ({ onPress, url, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Image source={url}></Image>
        <Text>{title}</Text>
      </Container>
    </TouchableOpacity>
  );
};

Customcardbutton.protoType = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Customcardbutton;
