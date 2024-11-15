import axios from 'axios';

const BASE_URL = 'https://saurav.tech/NewsAPI';

export const fetchNews = async (category = 'general', country = 'us', pageSize = 100) => {
  try {
    // Hanya mengambil berita berdasarkan kategori dan negara
    const url = `${BASE_URL}/top-headlines/category/${category}/${country}.json`;
    const response = await axios.get(url);
    return response.data.articles ? response.data.articles.slice(0, pageSize) : [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
