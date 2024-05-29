import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Track from './Track';

const RechercheResultat = ({ results, onSelectTrack }) => {
  return (
    <View style={styles.container}>
     
      <FlatList
       // Les résultats de la recherche sont passés en tant que données à FlatList
        data={results}

        // Chaque élément de la liste est identifié de manière unique par une combinaison de trackId et d'index
        keyExtractor={(item, index) => item.trackId.toString() + index} 

        // Pour chaque élément de la liste le composant Track est rendu
        renderItem={({ item }) => <Track track={item} onSelect={onSelectTrack} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
// Styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default RechercheResultat;
