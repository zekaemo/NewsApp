import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creating the FavoritesContext
export const FavoritesContext = createContext();

// Singleton class for managing favorites
class FavoritesSingleton {
  static instance = null;

  constructor() {
    if (FavoritesSingleton.instance) {
      return FavoritesSingleton.instance;
    }

    this.state = {
      favorites: [],
      setFavorites: () => {},
      toggleFavorite: () => {},
    };

    FavoritesSingleton.instance = this;
  }

  setFavoritesState = (newFavorites) => {
    this.state.favorites = newFavorites;
    this.state.setFavorites(newFavorites); // Update the state in React context
  };

  async toggleFavorite(article) {
    const { favorites, setFavorites } = this.state;
    const isFavorited = favorites.some((fav) => fav.url === article.url);
    let updatedFavorites;

    if (isFavorited) {
      // Remove from favorites
      updatedFavorites = favorites.filter((fav) => fav.url !== article.url);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, article];
    }

    this.setFavoritesState(updatedFavorites); // Update state in the Singleton
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Persist to AsyncStorage
  }

  async loadFavorites() {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    if (storedFavorites) {
      this.setFavoritesState(JSON.parse(storedFavorites));
    }
  }
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const favoritesSingleton = new FavoritesSingleton();
  favoritesSingleton.state.setFavorites = setFavorites; // Set the setFavorites function from React context

  useEffect(() => {
    favoritesSingleton.loadFavorites(); // Load favorites from AsyncStorage on mount
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite: favoritesSingleton.toggleFavorite.bind(favoritesSingleton) }}>
      {children}
    </FavoritesContext.Provider>
  );
};
