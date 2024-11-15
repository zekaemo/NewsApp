import axios from 'axios';

const API_KEY = 'AIzaSyD18F17mT7wCXu9FIz9upnHq_SevRZFAvI';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchYoutubeVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: API_KEY,
        q: query,
        part: 'snippet',
        maxResults: 10,
        type: 'video',
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};
