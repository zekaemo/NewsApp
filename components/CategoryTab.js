import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryTab = ({ category, selectedCategory, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, selectedCategory === category ? styles.activeTab : {}]}
    onPress={() => onPress(category)}
  >
    <Text style={styles.text}>{category.toUpperCase()}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tab: { padding: 10, backgroundColor: '#eee', marginHorizontal: 5, borderRadius: 5 },
  activeTab: { backgroundColor: '#007bff' },
  text: { color: '#333' },
});

export default CategoryTab;
