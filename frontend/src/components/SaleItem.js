import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
  justify-content: center;
  align-items: flex-start;
  margin: 10px 10px;
  padding: 5px;
  border-radius: 20px;
`;
const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 10px;
`;
const Text = styled.Text`
  font-size: 14px;
  font-weight: 600;
  padding: 0px 2px 2px 5px;
  color: ${({ theme }) => theme.cardTitle};
  width: 150px;
`;
const Price = styled.Text`
  font-size: 16px;
  font-weight: 600;
  padding: 0px 2px 2px 5px;
  color: red;
`;

const SaleItem = ({ onPress, url, title, price }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        {/* 실제코드, 아래는 보여주기식 예시 <Image source={{ uri: url }} /> */}
        <Image source={url} />

        <Text>{title}</Text>
        <Price>{price}</Price>
      </Container>
    </TouchableOpacity>
  );
};

SaleItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default SaleItem;
