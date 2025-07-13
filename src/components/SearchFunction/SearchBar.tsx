import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                style={{ padding: '0.5rem', width: '60%', maxWidth: '400px' }}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
                Search
            </button>
        </form>
    );
};

export default SearchBar;