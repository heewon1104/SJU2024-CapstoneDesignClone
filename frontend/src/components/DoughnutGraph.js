import PieChart from 'react-native-pie-chart';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  margin-right: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin: 5px;
`;

const DoughnutGraph = () => {
  const widthAndHeight = 120;
  const series = [200, 100];
  const sliceColor = ['#5DB075', '#F1F1F1'];

  return (
    <Container>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.75}
        coverFill={'#FFF'}
      />
      <Title>칼로리</Title>
    </Container>
  );
};

export default DoughnutGraph;
