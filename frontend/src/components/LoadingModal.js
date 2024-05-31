import React, { useEffect } from 'react';
import { Text, Modal, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const FullScreenCenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LoadingModalContent = styled.View`
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingModal = ({ isLoading, setIsLoading }) => {
  return (
    <Modal
      transparent={true}
      visible={isLoading}
      animationType="fade"
      onRequestClose={() => setIsLoading(false)}
    >
      <FullScreenCenteredView onTouchEnd={() => setIsLoading(false)}>
        <LoadingModalContent>
          <ActivityIndicator size="large" color="#5DB075" />
          <Text>로딩중...</Text>
        </LoadingModalContent>
      </FullScreenCenteredView>
    </Modal>
  );
};

export default LoadingModal;
