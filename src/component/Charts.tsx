import {
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  VictoryBar,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';
import {weightMock} from '../dataMock.ts/weight';
import {bloodPresureMock} from '../dataMock.ts/presionArterial';
import React, {useState} from 'react';
import Checkbox from './CheckBox';
import {ModalTime} from './modalTime';
// import Modal from 'react-native-modal'; // Install via `npm install react-native-modal`

// import {CheckBox} from '@rneui/themed';
// import {CheckBox} from 'react-native-elements';
// import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F5FCFF',
    // padding: 20,
  },
  container: {
    backgroundColor: '#F5FCFF',
    marginHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  labelButton: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: 'bold',
  },
  boxOptions: {
    flexDirection: 'row', // Buttons in a row
    // justifyContent: 'space-around', // Space between buttons
    alignItems: 'center', // Center vertically
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    // borderRadius: 8,
    // backgroundColor: 'gold',
    // width: '100%',
  },
});

const BarChart = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timeLine, setTimeLine] = useState<typeof intitialTime>(intitialTime);

  const dataWeight = weightMock.weight_data.map(item => {
    const date = item.date.split('-')[2];
    return {
      x: date,
      y: item.weight,
    };
  });

  return (
    <SafeAreaView>
      <Pressable style={styles.button} onPress={() => setShowModal(true)}>
        <Text style={styles.labelButton}>Time</Text>
      </Pressable>
      <Modal visible={showModal}>
        <ModalTime
          onClose={() => setShowModal(false)}
          setTimeLine={setTimeLine}
          timeLine={timeLine}
          data={dataWeight}
        />
      </Modal>
      <ScrollView horizontal style={styles.container}>
        <VictoryChart width={800} theme={VictoryTheme.clean}>
          <VictoryAxis crossAxis label={timeLine.month} />
          <VictoryAxis dependentAxis label="Peso" />
          <VictoryBar data={dataWeight} />
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
};
const lineValues = {
  diastolic: true,
  systolic: false,
};
const intitialTime = {
  month: 'January',
  quarter: 1,
};
const LineChart = ({prop = 'diastolic'}: {prop?: keyof typeof lineValues}) => {
  const [lineChart, setLineChart] = useState<typeof lineValues>(lineValues);
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timeLine, setTimeLine] = useState<typeof intitialTime>(intitialTime);
  const dataDiast = bloodPresureMock.map(item => {
    const date = item.date.split('-')[2];
    return {
      x: date,
      y: item.diastolic,
    };
  });
  const dataSyst = bloodPresureMock.map(item => {
    const date = item.date.split('-')[2];
    return {
      x: date,
      y: item.systolic,
    };
  });
  const handleTime = (time: string) => {
    // Update data with new time
    // Update state with new time
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.boxOptions}>
        <Pressable
          style={styles.button}
          onPress={() => setLineChart({diastolic: true, systolic: false})}>
          <Text style={styles.labelButton}>Diastolic</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setLineChart({diastolic: false, systolic: true})}>
          <Text style={styles.labelButton}>Systolic</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setToggleCheckBox(!toggleCheckBox);
            setLineChart(prev => ({...prev, systolic: !prev.systolic}));
          }}>
          <Checkbox isChecked={toggleCheckBox} />
        </Pressable>
        <Pressable style={styles.button} onPress={() => setShowModal(true)}>
          <Text style={styles.labelButton}>Time</Text>
        </Pressable>
        <Modal visible={showModal}>
          <ModalTime
            onClose={() => setShowModal(false)}
            setTimeLine={setTimeLine}
            timeLine={timeLine}
            data={dataDiast}
          />
        </Modal>
      </View>

      <ScrollView horizontal style={styles.container}>
        <VictoryChart width={800} theme={VictoryTheme.clean}>
          <VictoryAxis crossAxis label={timeLine.month} />
          <VictoryAxis dependentAxis />
          {lineChart.diastolic && <VictoryLine data={dataDiast} />}
          {lineChart.systolic && <VictoryLine data={dataSyst} />}
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
};

export {BarChart, LineChart};
