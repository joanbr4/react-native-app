import React from 'react';
// import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Charts} from './Charts';
import {Settings} from './Settings';
import {Main} from './Principal';
import {StyleSheet, useWindowDimensions} from 'react-native';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  const {width} = useWindowDimensions();

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: width > 450 ? false : true}}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Mi salud" component={Charts} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default HomeScreen;
