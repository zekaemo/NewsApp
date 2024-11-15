import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Button, Linking } from 'react-native';

const { width } = Dimensions.get('window'); // Dapatkan lebar layar

const DetailScreen = ({ route }) => {
  const { article } = route.params;

  // Fungsi untuk membersihkan konten dari tanda "[+xxx chars]"
  const cleanContent = (content) => {
    if (!content) return '';
    return content.replace(/\[\+\d+\schars\]/, ''); // Hapus pola [+(angka) chars]
  };

  // Fungsi untuk membuka link artikel asli
  const openOriginalArticle = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.author}>{article.author || 'Unknown Author'}</Text>
      <Text style={styles.published}>{new Date(article.publishedAt).toLocaleString()}</Text>
      <Text style={styles.description}>{article.description}</Text>
      <Text style={styles.content}>{cleanContent(article.content)}</Text>

      {/* Tombol untuk membuka artikel asli */}
      <Button title="Baca Selengkapnya" onPress={openOriginalArticle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  image: { 
    width: width * 0.9, 
    height: width * 0.5,
    maxHeight: 300,
    borderRadius: 10, 
    marginBottom: 16,
    alignSelf: 'center',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  author: { fontSize: 14, color: 'gray', marginBottom: 10 },
  published: { fontSize: 12, color: 'gray', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10 },
  content: { fontSize: 14, color: '#333', marginBottom: 20 },
});

export default DetailScreen;
