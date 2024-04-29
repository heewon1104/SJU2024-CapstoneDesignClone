import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const StyledCamera = styled(Camera)`
  flex: 1;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CameraButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: white;
`;

const ButtonText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

const TakePhoto = ({ checkModal, setImages, currentImages }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isCapturing, setIsCapturing] = useState(false);
  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <Container>
        <ButtonText>Requesting for camera permission...</ButtonText>
      </Container>
    );
  }
  if (hasPermission === false) {
    return (
      <Container>
        <ButtonText>No access to camera</ButtonText>
      </Container>
    );
  }

  const __takePicture = async () => {
    if (isCapturing || !camera.current) {
      return;
    }

    setIsCapturing(true); // 촬영 시작 전 촬영 중 상태로 설정
    try {
      const photo = await camera.current.takePictureAsync();
      console.log(photo);
      setImages([...currentImages, photo.uri]);
      checkModal(false);
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setIsCapturing(false); // 촬영 완료 후 촬영 중 상태 해제
    }
  };

  return (
    <StyledCamera ref={camera} type={type}>
      <ButtonContainer>
        <CameraButton onPress={__takePicture}></CameraButton>
      </ButtonContainer>
    </StyledCamera>
  );
};

export default TakePhoto;
