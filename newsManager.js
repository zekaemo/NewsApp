class NewsManager {
    constructor() {
      if (NewsManager.instance) {
        return NewsManager.instance;
      }
      this.subscribers = [];  // Menyimpan observer yang berlangganan
      this.newsData = []; // Menyimpan data berita
      this.sourcesData = []; // Menyimpan data sumber berita
      NewsManager.instance = this;
    }
  
    // Menambahkan subscriber/observer
    subscribe(observer) {
      this.subscribers.push(observer);
    }
  
    // Menghapus subscriber/observer
    unsubscribe(observer) {
      this.subscribers = this.subscribers.filter(sub => sub !== observer);
    }
  
    // Memberi tahu semua observer
    notify() {
      this.subscribers.forEach(subscriber => subscriber.update());
    }
  
    // Mengambil data berita dan memberi tahu observer
    async fetchNews() {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
        const json = await response.json();
        this.newsData = json.articles; // Menyimpan data berita
        this.notify(); // Memberitahu observer
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
  
    // Mengambil data sumber berita dan memberi tahu observer
    async fetchSources() {
      try {
        const response = await fetch('https://newsapi.org/v2/sources?apiKey=YOUR_API_KEY');
        const json = await response.json();
        this.sourcesData = json.sources; // Menyimpan data sumber berita
        this.notify(); // Memberitahu observer
      } catch (error) {
        console.error('Error fetching sources:', error);
      }
    }
  
    // Mendapatkan berita
    getNews() {
      return this.newsData;
    }
  
    // Mendapatkan sumber berita
    getSources() {
      return this.sourcesData;
    }
  }
  
  const instance = new NewsManager();
  Object.freeze(instance);
  export default instance;
  