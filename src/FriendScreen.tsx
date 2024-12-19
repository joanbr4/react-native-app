import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FriendScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Add friend here!</Text>
      </View>
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
});

export default FriendScreen;
