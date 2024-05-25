import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Track = ({ track, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(track)} style={styles.container}>
      <Text style={styles.title}>{track.trackName}</Text>
      <Text style={styles.artist}>{track.artistName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default Track;
