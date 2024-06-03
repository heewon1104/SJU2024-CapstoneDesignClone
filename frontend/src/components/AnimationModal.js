import React, { useRef } from 'react';
import { Modal, Button } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

// 전체 화면을 채우면서 중앙에 애니메이션을 배치
const FullScreenCenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
`;

// 애니메이션을 포함할 컨테이너
const AnimationContainer = styled.View`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 버튼을 포함할 컨테이너
const ButtonContainer = styled.View`
  margin-top: 20px;
`;

// AnimationModal 컴포넌트 정의
const AnimationModal = ({ isLoading, setIsLoading }) => {
  const animationRef = useRef(null);

  // 모달이 보여질 때 Lottie 애니메이션 자동 재생
  const handleOnModalShow = () => {
    animationRef.current?.play();
  };

  return (
    <Modal
      visible={isLoading}
      transparent={true}
      onRequestClose={() => setIsLoading(false)}
      onShow={handleOnModalShow}
      animationType="fade"
    >
      <FullScreenCenteredView>
        <AnimationContainer>
          <LottieView
            ref={animationRef}
            source={require('../../assets/components/Animation - 1715580540450.json')}
            loop
          />
        </AnimationContainer>
      </FullScreenCenteredView>
    </Modal>
  );
};

export default AnimationModal;
