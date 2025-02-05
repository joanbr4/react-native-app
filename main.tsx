// import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';

//Static
// const MyStack = createNativeStackNavigator({
//   initialRouteName: 'Home',
//   screens: {
//     Home: HomeScreen,
//     Friends: FriendScreen,
//   },
// });

const Stack = createNativeStackNavigator();
const Welcome = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Teleker</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              defaultValue="4834453"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              defaultValue="******"
            />
            <Button
              title="Entrar"
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 40,
    marginVertical: 10,
  },
});

export default App;
