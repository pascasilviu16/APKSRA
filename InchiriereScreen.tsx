import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InchiriereScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Ce vrei să închiriezi astăzi?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue', // Culoarea albastră pentru acest ecran
  },
});

export default InchiriereScreen;
