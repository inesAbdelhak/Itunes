import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Track from './Track';

const Favorites = ({ favorites, onRemoveFromFavorites }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes favoris</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => item.trackId.toString() + index}
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
