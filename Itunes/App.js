import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarreRecherche from './components/BarreRecherche';
import RechercheResultat from './components/RechercheResultat';
import Favorites from './components/Favorites';
import TrackDetail from './components/TrackDetail';

const Stack = createStackNavigator();

const App = () => {
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          setFavorites(JSON.parse(favorites));
        }
      } catch (error) {
        console.error('Error loading favorites', error);
      }
    };

    loadFavorites();
  }, []);

  const handleSearch = async (query) => {
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&entity=musicTrack`);
    const data = await response.json();
    setResults(data.results);
  };

  const addToFavorites = async (track) => {
    try {
      const isFavorite = favorites.some(fav => fav.trackId === track.trackId);
      if (isFavorite) {
        Alert.alert('Erreur', 'Cette musique est déjà dans les favoris');
      } else {
        const updatedFavorites = [...favorites, track];
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        Alert.alert('Succès', 'Bien ajouté aux favoris');
      }
    } catch (error) {
      console.error('Error adding to favorites', error);
    }
  };

  const removeFromFavorites = async (track) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.trackId !== track.trackId);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" options={{ title: 'Recherche' }}>
          {props => (
            <View style={styles.container}>
              <BarreRecherche onSearch={handleSearch} />
              <RechercheResultat results={results} onSelectTrack={(track) => props.navigation.navigate('TrackDetail', { track, onAddToFavorites: addToFavorites })} />
              <Button title="Mes favoris" onPress={() => props.navigation.navigate('Favorites')} />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="Favorites">
          {props => (
            <Favorites
              {...props}
              favorites={favorites}
              onRemoveFromFavorites={removeFromFavorites}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TrackDetail">
          {props => (
            <TrackDetail {...props} onAddToFavorites={addToFavorites} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
