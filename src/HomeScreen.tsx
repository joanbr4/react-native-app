import React from 'react';
// import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Settings} from './Settings';
import {Main} from './Principal';
import {useWindowDimensions} from 'react-native';
import {Charts} from './MiSalud';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: {navigation: any}) => {
  // const {width} = useWindowDimensions();

  return (
    <Tab.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
      {/* screenOptions={{headerShown: width > 450 ? false : true}}> */}
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Mi salud" component={Charts} />
      <Tab.Screen name="Settings" component={Charts} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
