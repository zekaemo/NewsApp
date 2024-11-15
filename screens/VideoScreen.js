import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import VideoCard from '../components/VideoCard';
import { fetchYoutubeVideos } from '../api/youtubeApi';

const VideoScreen = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState(''); // Kosong hingga pengguna mengetik
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk memuat video berdasarkan query
  const loadVideos = async (searchQuery) => {
    setIsLoading(true);
    const videoData = await fetchYoutubeVideos(searchQuery);
    setVideos(videoData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadVideos('berita'); // Memuat video berita secara default
  }, []);

  // Fungsi untuk handle perubahan teks pencarian
  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      loadVideos(text); // Hanya muat video jika ada input pencarian
    } else {
      loadVideos('berita'); // Kembali ke video berita jika input pencarian kosong
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search for videos..." // Tidak ada teks default di TextInput
        value={query}
        onChangeText={handleSearch} // Panggil handleSearch setiap kali teks berubah
      />

      {/* Video List */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id.videoId}
          renderItem={({ item }) => <VideoCard video={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 10, borderRadius: 5, margin: 10 },
});

export default VideoScreen;
