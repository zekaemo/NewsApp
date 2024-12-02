// SourcesScreen.js

import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const sources = [
  { id: 'abc-news', name: 'ABC News', description: 'Breaking news, features, and analysis.', language: 'en', country: 'us', url: 'https://abcnews.go.com' },
  { id: 'bbc-news', name: 'BBC News', description: 'UK and international news.', language: 'en', country: 'gb', url: 'https://bbc.com/news' },
  { id: 'cnn', name: 'CNN', description: 'News from the USA and the world.', language: 'en', country: 'us', url: 'https://cnn.com' },
  { id: 'the-new-york-times', name: 'The New York Times', description: 'Breaking news, world news, and analysis.', language: 'en', country: 'us', url: 'https://nytimes.com' },
  { id: 'the-wall-street-journal', name: 'The Wall Street Journal', description: 'US and world news from a business perspective.', language: 'en', country: 'us', url: 'https://wsj.com' },
  { id: 'the-verge', name: 'The Verge', description: 'Technology, science, and culture news.', language: 'en', country: 'us', url: 'https://theverge.com' },
  { id: 'techcrunch', name: 'TechCrunch', description: 'Tech startup and business news.', language: 'en', country: 'us', url: 'https://techcrunch.com' },
  { id: 'al-jazeera-english', name: 'Al Jazeera English', description: 'Middle Eastern and world news.', language: 'en', country: 'qa', url: 'https://aljazeera.com' },
  { id: 'reuters', name: 'Reuters', description: 'World news, breaking news, business news.', language: 'en', country: 'gb', url: 'https://reuters.com' },
  { id: 'huffpost', name: 'HuffPost', description: 'US news, politics, and entertainment.', language: 'en', country: 'us', url: 'https://huffpost.com' },
];

const SourcesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={sources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('SourceDetail', { source: item })}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
  itemText: { fontSize: 16, fontWeight: 'bold' },
});

export default SourcesScreen;
