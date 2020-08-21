import React from 'react';
import ImagesList from './components/Images';
import './App.scss';
import SearchComponent from "./components/search";

function App() {
  return (
    <div className="App">
        <div className="App-header">
            Search here:
            <SearchComponent />
        </div>
      <ImagesList />
    </div>
  );
}

export default App;
