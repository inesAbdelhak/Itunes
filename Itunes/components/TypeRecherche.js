import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const TypeRecherche = ({ onSelectType }) => {
  return (
    <View style={styles.container}>
      <Button title="Search by Artist" onPress={() => onSelectType('artist')} />
      <Button title="Search by Track" onPress={() => onSelectType('track')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default TypeRecherche;
