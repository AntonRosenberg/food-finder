import React, { useState } from 'react';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchFunction/SearchBar';
import './App.css';

const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchClicked, setSearchClicked] = useState<boolean>(false);

    return (
        <div>
            <h1 className="title">Food Finder</h1>
            <SearchBar onSearch={(query) => {
                setSearchQuery(query);
                setSearchClicked(true);         
            }} />
            { searchClicked &&
                <RecipeList searchQuery={searchQuery} />
            }
        </div>
    );
};

export default App;