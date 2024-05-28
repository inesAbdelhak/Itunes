import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Track from './Track';

const RechercheResultat = ({ results, onSelectTrack }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.trackId.toString() + index} // Combine trackId with index to ensure uniqueness
        renderItem={({ item }) => <Track track={item} onSelect={onSelectTrack} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default RechercheResultat;
