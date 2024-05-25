import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BarreRecherche from './components/BarreRecherche';
import RechercheResultat from './components/RechercheResultat';
import TypeRecherche from './components/TypeRecherche';

const App = () => {
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('artist');

  const handleSearch = async (query) => {
    const type = searchType === 'artist' ? 'term' : 'trackName';
    const response = await fetch(`https://itunes.apple.com/search?${type}=${query}&media=music&entity=musicTrack`);
    const data = await response.json();
    setResults(data.results);
  };

  const handleSelectType = (type) => {
    setSearchType(type);
  };

  const handleSelectTrack = (track) => {
    console.log('Selected track:', track);
    // Logic to handle track selection
  };

  return (
    <View style={styles.container}>
      <TypeRecherche onSelectType={handleSelectType} />
      <BarreRecherche onSearch={handleSearch} />
      <RechercheResultat results={results} onSelectTrack={handleSelectTrack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
