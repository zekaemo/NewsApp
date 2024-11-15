import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchNews } from '../api';
import NewsCard from '../components/NewsCard';
import CategoryTab from '../components/CategoryTab';
import { FavoritesContext } from '../FavoritesContext';

const HomeScreen = () => {
  const [news, setNews] = useState([]);
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
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((cat) => (
          <CategoryTab key={cat} category={cat} selectedCategory={category} onPress={setCategory} />
        ))}
      </View>
      <FlatList
        data={news}
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
  tabContainer: { flexDirection: 'row', padding: 10 },
});

export default HomeScreen;
