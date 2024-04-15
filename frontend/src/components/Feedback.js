import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Mascot } from '../../assets/components';
import ChatBubble from 'react-native-chat-bubble';
import { Platform } from 'react-native';

const TEXT = `오늘 먹은 치킨과 삼겹살은 지방 영양성분이 많아 고혈압에 좋지 않습니다.
채소와 과일이 많이 들어간 식단을 추천합니다.
오늘 먹은 치킨과 삼겹살은 지방 영양성분이 많아 고혈압에 좋지 않습니다.
채소와 과일이 많이 들어간 식단을 추천합니다.
오늘 먹은 치킨과 삼겹살은 지방 영양성분이 많아 고혈압에 좋지 않습니다.
채소와 과일이 많이 들어간 식단을 추천합니다.`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px 0px;
`;

const Text = styled.Text`
  align-items: flex-start;
  width: 90%;
  margin-bottom: 10px;
  line-height: ${Platform.OS == 'android' ? '20px' : '25px'};
  font-weight: 600;
  font-size: ${Platform.OS == 'android' ? '14px' : '18px'};
  padding: 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.bubbleText};

  background-color: ${({ theme }) => theme.bubbleBackground};
`;

const Feedback = () => {
  return (
    <Container>
      <Text>{TEXT}</Text>
    </Container>
  );
};

export default Feedback;
