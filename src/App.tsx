import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipieList';
import SearchBar from './components/SearchFunction/SearchBar';
import CountrySelector from './components/SearchFunction/CountrySelector';
import { fetchCountries } from './api/recipes';
import './App.css';

const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchClicked, setSearchClicked] = useState<boolean>(false);
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    useEffect(() => {
        fetchCountries().then(setCountries);
    }, []);

    return (
        <div className="app-container">
            <h1 className="title">Yui Food Finder</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <CountrySelector
                    countries={countries}
                    selectedCountry={selectedCountry}
                    onChange={setSelectedCountry}
                />
                <div style={{ maxWidth: '350px', width: '100%' }}>
                    <SearchBar onSearch={(query) => {
                        setSearchQuery(query);
                        setSearchClicked(true);
                    }} />
                </div>
            </div>
            { searchClicked &&
                <RecipeList searchQuery={searchQuery} country={selectedCountry} />
            }
        </div>
    );
};

export default App;