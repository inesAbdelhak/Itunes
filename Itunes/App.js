import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarreRecherche from './components/BarreRecherche';
import RechercheResultat from './components/RechercheResultat';
import Favorites from './components/Favorites';
import TrackDetail from './components/TrackDetail';


// Création d'une instance de Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  // stockage des résultats de la recherche et des favoris
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Utilisation de useEffect pour charger les favoris à partir de AsyncStorage lorsque le composant est monté
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

  // Fonction pour gérer la recherche + connexion à l'api en faisant appel à l'entité MusicTrack
  const handleSearch = async (query) => {
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&entity=musicTrack`);
    const data = await response.json();
    setResults(data.results);
  };

  // Fonction pour ajouter une track aux favoris
  const addToFavorites = async (track) => {
    try {
      // Vérifie si la track est déjà dans les favoris
      const isFavorite = favorites.some(fav => fav.trackId === track.trackId);
      if (isFavorite) {
        // Si dans les favoris alors on affiche une alerte d'erreur
        Alert.alert('Erreur', 'Cette musique est déjà dans les favoris');
      } else {
        const updatedFavorites = [...favorites, track];
        setFavorites(updatedFavorites);
        // Enregistre les favoris dans le stockage local
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        Alert.alert('Succès', 'Bien ajouté aux favoris');
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  // Fonction pour supprimer une track des favoris
  const removeFromFavorites = async (track) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.trackId !== track.trackId);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites', error);
    }
  };


  // rendu du composant
   // Le composant Stack.Navigator est utilisé pour gérer la navigation entre les écrans
    // Le composant NavigationContainer englobe toute l'application
    // Chaque écran est représenté par un composant Stack.Screen
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Search">
        
        <Stack.Screen name="Search" options={{ title: 'Recherche' }}>
            {props => (
              // Le composant View est utilisé pour grouper et appliquer des styles aux composants enfants
              <View style={styles.container}>
                <BarreRecherche onSearch={handleSearch} />
                <RechercheResultat results={results} onSelectTrack={(track) => props.navigation.navigate('TrackDetail', { track, onAddToFavorites: addToFavorites })} />
                
                
                <TouchableOpacity
                // Le composant TouchableOpacity est utilisé pour rendre un bouton qui navigue vers l'écran des favoris
                  style={styles.favoriteButton}
                  //lorsque l’utilisateur appuie sur le bouton, il navigue vers l’écran des favoris.
                  onPress={() => props.navigation.navigate('Favorites')}
                >
                  <Text style={styles.favoriteButtonText}>Mes favoris</Text>
                </TouchableOpacity>
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
            // Le composant TrackDetail est utilisé pour afficher les détails d'une track (musique)
            <TrackDetail {...props} onAddToFavorites={addToFavorites} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
  favoriteButton: {
    backgroundColor: '#007BFF', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  favoriteButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
});

export default App;
