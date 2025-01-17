import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
// import {MultipleLinesChart} from './MultipleLinesChart';
// import {BloodPresChart} from './PressionArtChart';
import {BarChart, LineChart} from './component/Charts';

export const Charts = () => {
  const [showMultipleLinesChart, setShowMultipleLinesChart] =
    useState<boolean>(false);
  const [showPressChart, setShowPressChart] = useState<boolean>(false);
  const [showWeightChart, setShowWeigthChart] = useState<boolean>(false);

  const {height, width} = useWindowDimensions();
  console.log('h:', height, 'w:', width);

  // useEffect(() => {}, [url]);

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.boxChart}> */}
      <Pressable
        style={styles.optionChart}
        onPress={() => {
          setShowPressChart(!showPressChart);
          // setShowMultipleLinesChart(false);
        }}>
        <Text style={styles.text}>Presion Arterial</Text>
      </Pressable>

      {showPressChart && <LineChart prop="diastolic" />}
      {/* </View> */}

      <View style={styles.boxChart}>
        <Pressable
          style={styles.optionChart}
          onPress={() => setShowWeigthChart(!showWeightChart)}>
          <Text style={styles.text}>Peso</Text>
        </Pressable>

        {showWeightChart && <BarChart />}
      </View>

      <View style={styles.boxChart}>
        <Pressable style={styles.optionChart}>
          <Text style={styles.text}>Glucosa</Text>
        </Pressable>

        {/* {showWeightChart && <LineChart />} */}
      </View>

      <Pressable style={styles.optionChart}>
        <Text style={styles.text}>All Data</Text>
      </Pressable>
      {/* {showMultipleLinesChart && <MultipleLinesChart />} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  optionChart: {
    backgroundColor: 'gold',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 1,
  },
  text: {
    color: '#4EB9FE',
  },
  container: {
    borderWidth: 2,
    borderColor: 'gold',
    marginTop: 20,
  },
  boxChart: {
    paddingVertical: 1,
  },
});
