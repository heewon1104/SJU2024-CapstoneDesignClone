import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Mascot } from '../../assets/components';

const Container = styled.View`
  flex-direction: row;
  align-content: space-between;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  align-items: flex-end;
  justify-content: flex-start;
`;

const Bubble = styled.View`
  background-color: ${({ theme }) => theme.bubbleBackground};
  padding: 10px 30px;
  border-radius: 30px;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  align-content: center;
`;
const ScoreContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Image = styled.Image`
  width: 130px;
  height: 180px;
  padding-bottom: 10px;
  margin-left: 5%;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.scoreTitle};
  padding-left: 8px;
`;

const DetailScore = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.HealthScoreValue};
  padding-right: 6px;
`;
const DetailTotal = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.HealthScoreTotalvalue};
`;

const HealthScore = () => {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <TextContainer>
        <Bubble>
          <TitleContainer>
            <MaterialIcons
              name="medical-services"
              size={24}
              color={theme.scoreTitle}
            />
            <Title>Healthy Score</Title>
          </TitleContainer>
          <ScoreContainer>
            <DetailScore>10</DetailScore>
            <DetailTotal>/100</DetailTotal>
          </ScoreContainer>
        </Bubble>
      </TextContainer>

      <Image source={Mascot}></Image>
    </Container>
  );
};

export default HealthScore;
