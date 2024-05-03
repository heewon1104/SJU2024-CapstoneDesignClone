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
  color: ${({ theme, isOver }) =>
    isOver ? theme.exceedValueDetail : theme.text};
`;

const Detail = styled.Text`
  font-size: 14;
  font-weight: 600;
  margin-top: 4px;
  color: ${({ theme, isOver }) =>
    isOver ? theme.exceedValueDetail : theme.text};
`;

const DoughnutGraph = ({ total, value }) => {
  const widthAndHeight = 120;
  const isOver = value > total;

  const series = [value, Math.max(total - value, 0)];
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
      <Detail isOver={isOver}>
        {value} / {total}
      </Detail>
      <Title isOver={isOver}>칼로리</Title>
    </Container>
  );
};

export default DoughnutGraph;
