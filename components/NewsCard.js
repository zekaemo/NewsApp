import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewsCard = ({ news, onPress, isFavorite }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => Linking.openURL(news.url)}
  >
    {news.urlToImage ? (
      <Image source={{ uri: news.urlToImage }} style={styles.image} />
    ) : (
      <View style={styles.noImagePlaceholder}>
        <Text style={styles.noImageText}>No Image</Text>
      </View>
    )}
    <View style={styles.info}>
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.author}>{news.author || 'Unknown Author'}</Text>
      <Text style={styles.published}>{new Date(news.publishedAt).toLocaleString()}</Text>
    </View>
    <TouchableOpacity onPress={onPress} style={styles.favoriteIcon}>
      <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="red" />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', margin: 10, padding: 10, backgroundColor: '#fff', borderRadius: 10 },
  image: { width: 80, height: 80, borderRadius: 10 },
  info: { flex: 1, paddingLeft: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  author: { fontSize: 12, color: 'gray' },
  published: { fontSize: 10, color: 'gray' },
  noImagePlaceholder: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  noImageText: { color: '#fff', fontSize: 12 },
  favoriteIcon: { padding: 8 },
});

export default NewsCard;
