import PieChart from 'react-native-pie-chart';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    margin: 5,
  },
});

const DoughnutGraph = () => {
  const widthAndHeight = 150;
  const series = [200, 100];
  const sliceColor = ['#5DB075', '#F1F1F1'];

  return (
    <>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.75}
        coverFill={'#FFF'}
      />
      <Text style={styles.title}>칼로리</Text>
    </>
  );
};

export default DoughnutGraph;
