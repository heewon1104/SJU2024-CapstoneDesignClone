import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.View`
  align-items: flex-end;
  justify-content: flex-start;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-content: center;
`;
const ScoreContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #5db075;
  padding-left: 8px;
`;

const DetailScore = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: red;
  padding-right: 6px;
`;
const DetailTotal = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: gray;
`;

const HealthScore = () => {
  return (
    <Container>
      <TextContainer>
        <MaterialIcons name="medical-services" size={24} color="#5db075" />
        <Title>Healthy Score</Title>
      </TextContainer>
      <ScoreContainer>
        <DetailScore>10</DetailScore>
        <DetailTotal>/ 100</DetailTotal>
      </ScoreContainer>
    </Container>
  );
};

export default HealthScore;
