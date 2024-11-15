import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { fetchNews } from '../api/newsApi';
import NewsCard from '../components/NewsCard';
import CategoryTab from '../components/CategoryTab';
import { FavoritesContext } from '../FavoritesContext';

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [query, setQuery] = useState(''); // State untuk query pencarian
  const [category, setCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Menggunakan FavoritesContext
  const COUNTRY = 'us';

  useEffect(() => {
    loadNews(category);
  }, [category]);

  const loadNews = async (selectedCategory) => {
    setIsLoading(true);
    const data = await fetchNews(selectedCategory, COUNTRY);
    setNews(data || []);
    setFilteredNews(data || []); // Atur `filteredNews` sesuai `news` yang di-load
    setIsLoading(false);
  };

  // Fungsi untuk handle pencarian
  const handleSearch = (text) => {
    setQuery(text);
    const filteredResults = news.filter((article) =>
      article.title.toLowerCase().includes(text.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredNews(filteredResults); // Update `filteredNews` dengan hasil pencarian
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search for news..."
        value={query}
        onChangeText={handleSearch}
      />

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((cat) => (
          <CategoryTab key={cat} category={cat} selectedCategory={category} onPress={setCategory} />
        ))}
      </View>

      {/* News List */}
      <FlatList
        data={filteredNews} // Menggunakan `filteredNews` untuk menampilkan hasil pencarian
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <NewsCard
            news={item}
            onPress={() => toggleFavorite(item)} // Menambahkan/toggle favorit
            isFavorite={favorites.some((fav) => fav.url === item.url)} // Menandai apakah artikel ada di favorit
          />
        )}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#007bff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 10, borderRadius: 5, margin: 10 },
  tabContainer: { flexDirection: 'row', padding: 10 },
});

export default HomeScreen;
