import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Track from './Track';

const Favorites = ({ favorites, onRemoveFromFavorites }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes favoris</Text>
      <FlatList
      // Les favoris sont passés en tant que données à FlatList
        data={favorites}

        // Chaque élément de la liste est identifié de manière unique par une combinaison de trackId et d'index
        keyExtractor={(item, index) => item.trackId.toString() + index}

        // Pour chaque élément de la liste, un composant Track est rendu avec un bouton pour le supprimer des favoris
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Track track={item} />
            <Button title="Supprimer des favoris" onPress={() => onRemoveFromFavorites(item)} />
          </View>
        )}
      />
    </View>
  );
};

// styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default Favorites;
