import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../api';
import { FavoritesContext } from '../FavoritesContext';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [allNews, setAllNews] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Akses context favorit
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    // Muat semua berita sekali saja saat komponen pertama kali dirender
    const loadAllNews = async () => {
      setIsLoading(true);
      const data = await fetchNews(); // Ambil berita tanpa filter
      setAllNews(data);
      setSearchResults(data); // Default menampilkan semua berita
      setIsLoading(false);
    };
    loadAllNews();
  }, []);

  const handleSearch = (text) => {
    setQuery(text);

    // Filter berita secara lokal berdasarkan kata kunci
    const filteredResults = allNews.filter((article) =>
      article.title.toLowerCase().includes(text.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(text.toLowerCase()))
    );
    setSearchResults(filteredResults);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for news..."
        value={query}
        onChangeText={handleSearch}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <NewsCard
              news={item}
              onPress={() => toggleFavorite(item)} // Menambahkan/toggle favorit
              isFavorite={favorites.some((fav) => fav.url === item.url)} // Menandai apakah artikel ada di favorit
            />
          )}
        />
      ) : (
        query.length > 0 && <Text style={styles.noResults}>No results found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  noResults: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});

export default SearchScreen;
