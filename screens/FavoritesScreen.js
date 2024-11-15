import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import NewsCard from '../components/NewsCard';
import { FavoritesContext } from '../FavoritesContext';

const FavoritesScreen = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Mengakses context

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No Favorites Added</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <NewsCard
              news={item}
              onPress={() => toggleFavorite(item)} // Untuk menghapus dari favorit jika diinginkan
              isFavorite={true} // Semua artikel di halaman favorit harus ditandai sebagai favorit
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});

export default FavoritesScreen;
