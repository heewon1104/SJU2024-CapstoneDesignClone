import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
  background-color: ${({ theme, isFocused }) =>
    isFocused ? theme.cardfocusedBackGround : theme.cardBackground};
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  padding: 5px;
  border-radius: 20px;
`;
const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;
const Text = styled.Text`
  font-size: 22px;
  font-weight: 600;
  padding: 0px 2px 2px 5px;
  color: ${({ theme }) => theme.cardTitle};
`;

const CustomCardButton = ({ onPress, url, title, isFocused }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container isFocused={isFocused}>
        <Image source={url} />
        <Text>{title}</Text>
      </Container>
    </TouchableOpacity>
  );
};

CustomCardButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default CustomCardButton;
