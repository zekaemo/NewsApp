// SourceDetailScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SourceDetailScreen = ({ route }) => {
  const { source } = route.params; // Mendapatkan data sumber yang dipilih

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{source.name}</Text>
      <Text style={styles.detail}>ID: {source.id}</Text>
      <Text style={styles.detail}>Description: {source.description || 'N/A'}</Text>
      <Text style={styles.detail}>Language: {source.language || 'N/A'}</Text>
      <Text style={styles.detail}>Country: {source.country || 'N/A'}</Text>
      <Text style={styles.detail}>URL: <Text style={styles.link}>{source.url}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  detail: { fontSize: 16, marginBottom: 5 },
  link: { color: 'blue', textDecorationLine: 'underline' },
});

export default SourceDetailScreen;
