import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

const TrackDetail = ({ route }) => {
  const { track, onAddToFavorites } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{track.trackName}</Text>
      <Text style={styles.artist}>{track.artistName}</Text>
      <Text style={styles.album}>{track.collectionName}</Text>
      <Text style={styles.genre}>{track.primaryGenreName}</Text>
      <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />
      <Button title="Ajouter aux favoris" onPress={() => {
        onAddToFavorites(track);
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  album: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  genre: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default TrackDetail;
