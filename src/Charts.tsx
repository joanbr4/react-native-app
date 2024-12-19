import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Config from 'react-native-config';
// import {BarChart, PieChart} from 'react-native-gifted-charts';
import {LineChart} from 'react-native-gifted-charts';
import {data as DataChart} from '../dataMock';
import {ButtonChart} from './component/buttonsChart';

const initialDate = {
  start_date: '',
  end_date: '',
};
type TlineChart = {
  value: number;
  label: string;
};
type Tdate = typeof initialDate;

type TResponseChartStock<T> = {
  meta: object;
  status: string;
  values: T[];
};

export const Charts = () => {
  const [symb, setSymb] = useState<string>('AAPL');
  const [date, setDate] = useState<Tdate>(initialDate);
  const [lines, setLines] = useState<TlineChart[] | null>(null);
  const [timeLine, setTimeLine] = useState<string>('1day');
  const [lowest, setLowest] = useState<number>(0);
  const [fIndex, setFIndex] = useState<number>(2);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const api_TW = 'd5036fc8edfb404c8034c00bc4f0febe';
  const api_DOTENV = Config.API_TWELVEDATA;
  console.log('apii', api_DOTENV);

  const url = `https://api.twelvedata.com/time_series?apikey=${api_TW}&interval=${timeLine}&symbol=${symb}&start_date=${date.start_date}&end_date=${date.end_date}`;

  const {height, width} = useWindowDimensions();
  console.log('h:', height, 'w:', width);
  const processDataToChart = async <
    T extends {
      close: string;
      datetime: string;
      high: string;
      low: string;
      open: string;
      volume: string;
    },
  >(
    data: TResponseChartStock<T>,
  ): Promise<void> => {
    const lastToOlderArray: TlineChart[] = [];
    data.values.map((item, index) => {
      let timeX = '';
      if (index === 0) {
        console.log(item.datetime, ' - ', item.close);
      }
      if (timeLine === '1day') {
        timeX = item.datetime.split('-')[2];
      } else if (timeLine === '1h') {
        const time = item.datetime.split(' ')[1].split(':');
        timeX =
          // item.datetime.split(' ')[0].split('-')[2] +
          // '-' +
          time[0] + ':' + time[1];
      }
      lastToOlderArray.unshift({value: parseFloat(item.close), label: timeX});
    });
    const lowMap = Math.min(
      ...data.values.map(item => parseInt(item.close, 10)),
    );
    // const highMap = Math.max(
    //   ...data.values.map(item => parseInt(item.close, 10)),
    // );
    console.log('dataToShowFilteres', lastToOlderArray);
    setLowest(lowMap);
    setLines(lastToOlderArray);
  };
  console.log('lin:', lines);
  useEffect(() => {
    console.log('url:', url);
    const fetchData = async () => {
      const response = await fetch(url, {
        method: 'GET',
      });

      const dataChart = await response.json();
      // console.log('data', dataChart);
      processDataToChart(dataChart);
    };
    fetchData();
  }, [url]);

  return (
    <View>
      {width < 450 ? (
        <ButtonChart
          setSymb={setSymb}
          setTimeLine={setTimeLine}
          timeLine={timeLine}
          setDate={setDate}
          show={'portrait'}
        />
      ) : null}
      <View style={styles.cont_chart}>
        {width > 450 && (
          <>
            <Modal visible={modalVisible} transparent={true}>
              {/* TODO */}
              <View style={styles.groupButtonModal}>
                <ButtonChart
                  setSymb={setSymb}
                  setTimeLine={setTimeLine}
                  timeLine={timeLine}
                  setDate={setDate}
                  show={'landscape'}
                  // styles={styles.groupButtonModal}
                  component={
                    <Pressable
                      style={styles.closeModal}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setHidden(!hidden);
                      }}>
                      <View>
                        <Image
                          source={require('./assets/close-square-svgrepo-com.png')}
                          style={styles.buttonModal}
                        />
                      </View>
                    </Pressable>
                  }
                />
              </View>
            </Modal>
            {!hidden && (
              <Pressable
                style={styles.modal}
                // style={styles.buttonModal}
                onPress={() => {
                  setModalVisible(!modalVisible), setHidden(!hidden);
                }}>
                <View>
                  <Image
                    source={require('./assets/21894454.jpg')}
                    style={styles.buttonModal}
                  />
                  {/* <Image src={tuerca} /> */}
                </View>
              </Pressable>
            )}
          </>
        )}
        <View style={styles.chart}>
          {lines && (
            <LineChart
              animateOnDataChange
              // width={lines.length * 50}
              isAnimated
              color="#475D9D"
              thickness={2}
              // spacing={1}
              // hideDataPoints
              rulesColor="gray"
              dataPointsColor="#FFFFFF"
              onDataChangeAnimationDuration={200}
              data={lines}
              yAxisSide={1}
              yAxisColor="lightgray"
              xAxisColor="lightgray"
              width={width > 450 ? width - 60 : width - 50} // Set an appropriate width
              height={height > 450 ? height - 550 : height - 130}
              yAxisOffset={
                timeLine === '1m'
                  ? lowest - 1
                  : timeLine === '1h'
                  ? lowest - 3
                  : lowest - 5
              }
              backgroundColor={'#172D81'}
              areaChart
              // curved
              startOpacity1={0.2}
              focusEnabled
              focusedDataPointIndex={fIndex}
              onFocus={(item, index) => setFIndex(index)}
              // focusedDataPointColor={'#475D9D'}
              // showDataPointOnFocus
              scrollToEnd
              showVerticalLines
              verticalLinesColor="lightgray"
              // maxValue={highest + 2}
            />
          )}
        </View>
        <View />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    maxWidth: '100%',
    marginTop: 5,
  },
  cont_chart: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  modal: {
    position: 'absolute',
    backgroundColor: '#41EAD4',
    top: 20,
    left: 20,
    // padding: 7,
    borderColor: '#41EAD4',
    borderRadius: 5,
    borderWidth: 2,
    zIndex: 10,
  },
  textModal: {
    // elevation: 5,
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonModal: {
    // padding: 1,
    // borderWidth: 1,
    width: 40,
    height: 40,
  },
  closeModal: {
    position: 'absolute',
    top: 0,
    left: 110,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    // borderWidth: 1,
    borderColor: 'gray',
    elevation: 3,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  groupButtonModal: {
    position: 'absolute',
    top: 20,
    left: 5,
  },
});
