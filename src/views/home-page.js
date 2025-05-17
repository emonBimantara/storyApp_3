import HomePagePresenter from '../presenters/home-presenter.js';
import './story-item.js';

const HomePage = {
  async render() {
    return `
      <div class="page-container">
        <h2>Daftar Cerita</h2>
        <div class="story-list" id="story-list"></div>
        <div id="map" style="width: 100%; height: 400px;"></div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const stories = await HomePagePresenter.loadStories();
      const listContainer = document.getElementById('story-list');
      const mapContainer = document.getElementById('map');
      
      listContainer.innerHTML = '';

      this._initMap(mapContainer);

      requestAnimationFrame(() => {
        this.map.invalidateSize();
      });

      stories.forEach((story) => {
        const storyItem = document.createElement('story-item');
        storyItem.story = story;
        listContainer.appendChild(storyItem);
        
        this._addMarkerToMap(story);
      });
    } catch (error) {
      console.error('Error in HomePage afterRender:', error);
      alert('Gagal memuat cerita.');
    }
  },

  _initMap(mapContainer) {
    if (this.map) {
      this.map.remove(); 
      this.map = null;
    }

    this.map = L.map(mapContainer).setView([-6.200000, 106.816666], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  },

  _addMarkerToMap(story) {
    const { lat, lon } = story;
  
    if (lat && lon) {
      const markerIcon = L.divIcon({
        className: 'emoji-marker',
        html: '📍',
        iconSize: [30, 30],
      });

      const marker = L.marker([lat, lon], { icon: markerIcon }).addTo(this.map);

      marker.bindPopup(
        `<strong>${story.name}</strong><br>
         ${story.description}<br>
         Dibuat pada: ${new Date(story.createdAt).toLocaleDateString()}<br>
         Lokasi: Lat: ${lat}, Lon: ${lon}<br>`
      );
    }
  }
};

export default HomePage;