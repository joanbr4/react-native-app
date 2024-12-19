import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

type Tenterprise = {
  empresa: string;
  symbol: string;
};
const initialDate = {
  start_date: '',
  end_date: '',
};

type Tdate = typeof initialDate;

type ButtonChartProps = {
  // setSymb: (symbol: string) => void;
  setSymb: React.Dispatch<React.SetStateAction<string>>;
  setTimeLine: React.Dispatch<React.SetStateAction<string>>;
  timeLine: string;
  setDate: React.Dispatch<React.SetStateAction<Tdate>>;
  show: string;
  component?: ReactNode;
};

export const ButtonChart = ({
  setSymb,
  setTimeLine,
  timeLine,
  setDate,
  show,
  component,
}: ButtonChartProps) => {
  const dataEnterprise = [
    {empresa: 'Apple', symbol: 'AAPL'},
    {empresa: 'Meta', symbol: 'MET'},
    {empresa: 'Google', symbol: 'GOOG'},
    {empresa: 'Nvidia', symbol: 'NVDA'},
    {empresa: 'Tesla', symbol: 'TSLA'},
  ];

  const month = [
    {
      mes: 'Setiembre',
      start_date: '2024-10-01 00:00:00',
      end_date: '2024-10-30 23:59:00',
    },

    {
      mes: 'Noviembre',
      start_date: '2024-11-01 00:00:00',
      end_date: '2024-11-30 23:59:00',
    },

    {
      mes: 'Diciembre',
      start_date: '2024-12-01 00:00:00',
      end_date: '2024-12-12 23:59:00',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {flexDirection: show == 'portrait' ? 'row' : 'column'},
      ]}>
      <View>
        {/* <View style={styles.halfView}> */}
        {show === 'portrait' && <Text>Empresa </Text>}
        <View style={{flexDirection: 'row'}}>
          <SelectDropdown
            data={dataEnterprise}
            onSelect={(selected: Tenterprise) => {
              setSymb(selected.symbol);
              console.log(selected);
            }}
            renderButton={selectedItem => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text>{selectedItem ? selectedItem.empresa : 'Apple'}</Text>
                </View>
              );
            }}
            renderItem={item => {
              return (
                <View style={styles.dropdownItemStyle}>
                  <Text>{item.empresa}</Text>
                </View>
              );
            }}
            dropdownStyle={styles.dropdownContainer}
            // defaultValue={'Apple'}
            // showsVerticalScrollIndicator={true}
          />
          {component && component}
        </View>
      </View>

      <View style={styles.buttonCont}>
        <TouchableOpacity
          style={[styles.button, timeLine === '1m' && styles.selectedItem]}
          onPress={() => setTimeLine('1m')}>
          <Text style={styles.textButton}>1m</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonCont}>
        <TouchableOpacity
          style={[styles.button, timeLine === '1h' && styles.selectedItem]}
          onPress={() => setTimeLine('1h')}>
          <Text style={styles.textButton}>1h</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonCont}>
        <TouchableOpacity
          style={[styles.button, timeLine === '1day' && styles.selectedItem]}
          onPress={() => setTimeLine('1day')}>
          <Text style={styles.textButton}>1d</Text>
        </TouchableOpacity>
        {/* <Button title="1day" /> */}
      </View>
      <View>
        {/* <View style={styles.halfView}> */}
        {show === 'portrait' && <Text>Mes de facturación</Text>}

        <SelectDropdown
          data={month}
          onSelect={(selected: Tdate) => {
            setDate({
              start_date: selected.start_date,
              end_date: selected.end_date,
            });
            console.log(selected);
          }}
          dropdownStyle={styles.dropdownContainer}
          renderButton={selectedItem => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text>{selectedItem ? selectedItem.mes : 'Diciembre'}</Text>
              </View>
            );
          }}
          renderItem={item => {
            return (
              <View style={styles.dropdownItemStyle}>
                <Text>{item.mes}</Text>
              </View>
            );
          }}
          defaultValue={'Diciembre'}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: 'transparent',
    marginTop: -51,
    height: 150,
    width: 100,
  },
  dropdownButtonStyle: {
    height: 50,
    width: 100,
    // width: '10%',
    // backgroundColor: 'transparent',
    borderColor: '#41EAD4',
    borderWidth: 1,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  container: {
    flexDirection: 'row', // Arrange children horizontally
    flexWrap: 'wrap',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 10,
  },
  buttonCont: {
    margin: 5,
    width: 30,
    height: 30,
    backgroundColor: '#07BAD1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    // borderColor: 'black',
    borderWidth: 1, // Optional: Add a border to see the separation clearly
  },
  button: {
    backgroundColor: '#007AFF', // Blue color like default Button
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Full width of the parent container
    height: '100%', // Full height of the parent container
    borderRadius: 8,
  },
  textButton: {
    width: '100%', // Full width of the parent container
    textAlign: 'center',
    // borderRadius: 10,
    // marginVertical: 10,
  },
  selectedItem: {
    margin: 5,
    width: 30,
    height: 30,
    // backgroundColor: '#07BAD1',
    backgroundColor: 'yellow',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    // borderColor: 'black',
    borderWidth: 1,
  },
  dropdownItemStyle: {
    width: 100,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
  },
});
