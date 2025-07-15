import React, { useState } from 'react';
import { CONTROL_HEIGHT } from '../../constants/ui';

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
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                gap: '0.5rem'
            }}
        >
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                style={{
                    padding: '0 1rem',
                    width: '80%',
                    maxWidth: '65%',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    height: CONTROL_HEIGHT
                }}
            />
            <button
                type="submit"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5em',
                    padding: '0 1.5rem',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'linear-gradient(90deg, #e0e0e0 0%, #b0b0b0 50%, #888 100%)',
                    color: '#333',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    height: CONTROL_HEIGHT,
                    transition: 'box-shadow 0.2s',
                }}
            >
                <span className="material-icons" style={{ fontSize: '1.2em' }}>search</span>
                Search
            </button>
        </form>
    );
};

export default SearchBar;