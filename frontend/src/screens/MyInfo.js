import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { Customtext, HealthScoreChart, LoadingModal } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '../secret/env';
import { ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Markdown from 'react-native-markdown-display';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const BoxContainer = styled.View`
  align-content: space-between;
  justify-content: space-between;
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 20px;
  width: ${({ width }) => width - 30}px;
  margin-top: 20px;
`;
const Title = styled.Text`
  color: ${({ titleColor }) => titleColor};
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0px;
`;
// const Explanation = styled.Text`
//   color: gray;
//   font-size: 14px;
// `;

const Advantages = `* 탄단지 비율이 완벽해요
* 당 섭취를 잘 제한했어요
* 오메가3을 잘 챙겼어요`;

const Disadvantage = `* 너무 많이 먹었어요 치팅데인가요?!
* 나트륨 섭취를 줄여보아요
* 콜레스트롤 섭취를 줄여보아요`;

const MyInfo = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('Mount!!!!!!');
  //     updateInstructionData();
  //   }, [])
  // );

  return (
    <Container>
      <LoadingModal
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></LoadingModal>

      <Customtext text="일주일간 식단을 분석해봤어요!"></Customtext>
      <HealthScoreChart
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></HealthScoreChart>
      <ScrollView>
        <BoxContainer width={width}>
          <Title titleColor="blue">잘했어요</Title>
          <Markdown>{Advantages}</Markdown>
          <Title titleColor="red">아쉬워요</Title>
          <Markdown>{Disadvantage}</Markdown>
        </BoxContainer>
      </ScrollView>
    </Container>
  );
};
export default MyInfo;
