import _ from 'lodash';
import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import './App.css';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const API_KEY = 'AIzaSyDDPMb8H5i5Xwp-T57HFAcS3mdnCUpXzK4';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideos: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div className="App">
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} 
        />
      </div>
    );
  }
}

export default App;
