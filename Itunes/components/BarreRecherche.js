import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const BarreRecherche = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handlePress = () => {
    onSearch(input);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Search for artists or tracks"
      />
      <Button title="Search" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 8,
    height: 40,
    borderRadius: 5,
  },
});

export default BarreRecherche;
