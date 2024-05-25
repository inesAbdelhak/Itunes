import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Rating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRate = (rate) => {
    setRating(rate);
    onRate(rate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rating: {rating}</Text>
      <View style={styles.buttons}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <Button key={rate} title={`${rate}`} onPress={() => handleRate(rate)} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Rating;
