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
  padding: 10px;
  border-radius: 20px;
`;
const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 10px;
`;
const Text = styled.Text`
  font-size: 16px;
  font-weight: 600;
  padding: 5px 0px 5px 0px;
  width: 150px;
  color: ${({ theme }) => theme.cardTitle};
  text-align: center;
`;

const RecipeContainer = ({ onPress, url, title, isFocused }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container isFocused={isFocused}>
        <Image source={url} />
        <Text>{title}</Text>
      </Container>
    </TouchableOpacity>
  );
};

RecipeContainer.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default RecipeContainer;
