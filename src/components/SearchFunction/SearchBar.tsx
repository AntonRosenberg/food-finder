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
        <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                style={{
                    padding: '0.75rem 1rem',
                    width: '60%',
                    maxWidth: '350px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    marginRight: '0.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(90deg,#4f8cff,#38c6fa)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;