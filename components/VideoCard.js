import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VideoCard = ({ video }) => {
  const navigation = useNavigation();
  const { thumbnails, title, channelTitle, publishedAt, description } = video.snippet;

  // Fungsi untuk membuka VideoPlayerScreen dengan data video yang diperlukan
  const openVideo = () => {
    navigation.navigate('VideoDetail', { 
      videoId: video.id.videoId, // Mengirim videoId
      videoTitle: title,          // Mengirim judul video
      channelTitle: channelTitle, // Mengirim nama channel
      publishedAt: publishedAt,   // Mengirim waktu publikasi
      description: description,   // Mengirim deskripsi video
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openVideo}>
      <Image source={{ uri: thumbnails.high.url }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.channel}>{channelTitle}</Text>
        <Text style={styles.views}>{new Date(publishedAt).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', margin: 10 },
  thumbnail: { width: 120, height: 90, borderRadius: 8 },
  infoContainer: { flex: 1, paddingLeft: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  channel: { fontSize: 14, color: 'gray' },
  views: { fontSize: 12, color: 'gray' },
});

export default VideoCard;
