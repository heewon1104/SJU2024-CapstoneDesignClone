import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

const Container = styled.View`
  width: 95%;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #bfbfbf;
  padding: 10px 15px;
  border-radius: 10px;
  flex-direction: row;
`;

const fontSize = Platform.OS === 'android' ? '16px' : '20px';

const Title = styled.Text`
  font-size: ${fontSize};
  font-weight: 600;
  color: gray;
  flex: 1;
`;

const Image = styled.Image`
  width: 135px;
  height: 90px;
`;

const CookingProcessItem = ({ order, detail, url }) => {
  return (
    <Container>
      <Title>
        {order}. {detail}
      </Title>
      <Image source={{ uri: url }} />
    </Container>
  );
};

export default CookingProcessItem;
