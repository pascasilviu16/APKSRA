import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompostScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Ne bucurăm că ai ales să depui compost!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen', // Culoarea verde deschis pentru acest ecran
  },
});

export default CompostScreen;
