// Importation des modules nécessaires
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';


// composant BarreRecherche
const BarreRecherche = ({ onSearch }) => {
  // stockage de la valeur d'entrée
  const [input, setInput] = useState('');

  const handlePress = () => {
    // Appel de la fonction onSearch 
    onSearch(input);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Effectuez une recherche..."
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

// styles 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20, 
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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20, 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BarreRecherche;
