import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

const VideoDetailScreen = ({ route }) => {
  const { videoId, videoTitle, channelTitle, publishedAt, description } = route.params;

  // URL untuk thumbnail video
  const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`; // Thumbnail YouTube
  const youtubeVideoUrl = `https://www.youtube.com/watch?v=${videoId}`; // URL YouTube untuk video

  // Fungsi untuk membuka link YouTube di browser
  const openYouTube = () => {
    Linking.openURL(youtubeVideoUrl);
  };

  return (
    <View style={styles.container}>
      {/* Thumbnail Video */}
      <TouchableOpacity onPress={openYouTube}>
        <Image source={{ uri: videoThumbnailUrl }} style={styles.thumbnail} />
      </TouchableOpacity>
      <Text style={styles.title}>{videoTitle}</Text>
      <Text style={styles.channel}>Channel: {channelTitle}</Text>
      <Text style={styles.published}>Published on: {new Date(publishedAt).toLocaleString()}</Text>

      {/* Deskripsi Video */}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  thumbnail: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  channel: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 10,
  },
  published: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 10,
  },
  description: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default VideoDetailScreen;
