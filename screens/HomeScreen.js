import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TextInput, ScrollView, Dimensions } from 'react-native';
import { fetchNews } from '../api/newsApi';
import NewsCard from '../components/NewsCard';
import CategoryTab from '../components/CategoryTab';
import { FavoritesContext } from '../FavoritesContext';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const COUNTRY = 'us';

  useEffect(() => {
    loadNews(category);
  }, [category]);

  const loadNews = async (selectedCategory) => {
    setIsLoading(true);
    const data = await fetchNews(selectedCategory, COUNTRY);
    setNews(data || []);
    setFilteredNews(data || []);
    setIsLoading(false);
  };

  const handleSearch = (text) => {
    setQuery(text);
    const filteredResults = news.filter((article) =>
      article.title.toLowerCase().includes(text.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredNews(filteredResults);
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

      {/* Scrollable Category Tabs */}
      <View style={styles.tabContainer}>
        {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((cat) => (
          <CategoryTab key={cat} category={cat} selectedCategory={category} onPress={setCategory} />
        ))}
      </View>

      {/* News List */}
      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <NewsCard
            news={item}
            onPress={() => toggleFavorite(item)}
            isFavorite={favorites.some((fav) => fav.url === item.url)}
          />
        )}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#007bff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  tabContainer: { flexDirection: 'row', padding: 10 },
});
export default HomeScreen;
