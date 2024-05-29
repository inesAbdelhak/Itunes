import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Track = ({ track, onSelect }) => {
  return (
    // Lorsqu'on appuie sur le composant, la fonction onSelect est appelée avec le  track comme argument
    <TouchableOpacity style={styles.container} onPress={() => onSelect(track)}>
      <Text style={styles.title}>{track.trackName}</Text>
      <Text style={styles.artist}>{track.artistName}</Text>
      <Text style={styles.genre}>{track.primaryGenreName}</Text>
    </TouchableOpacity>
  );
};

// styles
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
  genre: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
  },
});

export default Track;
