import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';

const TrackDetail = ({ route }) => {
  // Extraction des paramètres de la route
  const { track, onAddToFavorites } = route.params;
  // Pour stocker la note
  const [rating, setRating] = useState(0);
// Utilisation de useEffect pour charger la note à partir de AsyncStorage lorsque le composant est monté
  useEffect(() => {
    const loadRating = async () => {
      try {
        // Tentative de chargement de la note à partir de AsyncStorage
        const storedRating = await AsyncStorage.getItem(`rating_${track.trackId}`);
        if (storedRating !== null) {
          // Si une note est stockée alors mise à jour de l'état
          setRating(parseFloat(storedRating));
        }
      } catch (error) {
        console.error('Error loading rating', error);
      }
    };
    // Appel de la fonction loadRating
    loadRating();
  }, [track.trackId]);
  // Dépendance sur track.trackId pour s'assurer que la note est rechargée lorsque le track change

  // Fonction pour gérer la fin de la notation
  const handleRatingCompleted = async (rating) => {
    // Mise à jour des notes
    setRating(rating);
    try {
      // Sauvegarde de la note dans AsyncStorage
      await AsyncStorage.setItem(`rating_${track.trackId}`, rating.toString());
    } catch (error) {
      console.error('Error saving rating', error);
    }
  };

  // Rendu du composant
   //Utilisation du composant AirbnbRating pour permettre à l'utilisateur de noter la piste
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{track.trackName}</Text>
      <Text style={styles.artist}>{track.artistName}</Text>
      <Text style={styles.album}>{track.collectionName}</Text>
      <Text style={styles.genre}>{track.primaryGenreName}</Text>
      <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />
      <AirbnbRating
        count={5}
        reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
        defaultRating={rating}
        onFinishRating={handleRatingCompleted}
        size={30}
      />
      <Button title="Ajouter aux favoris" onPress={() => {
        onAddToFavorites(track);
        Alert.alert('Succès', 'Bien ajouté aux favoris');
      }} />
    </View>
  );
};

// Styles
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
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
    textAlign: 'center',
  },
  album: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
    textAlign: 'center',
  },
  genre: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default TrackDetail;
