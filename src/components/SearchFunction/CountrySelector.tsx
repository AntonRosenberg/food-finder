import React from 'react';
import { CONTROL_HEIGHT } from '../../constants/ui';

type CountrySelectorProps = {
  countries: string[];
  selectedCountry: string;
  onChange: (country: string) => void;
};

const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, selectedCountry, onChange }) => (
  <select
    value={selectedCountry}
    onChange={e => onChange(e.target.value)}
    style={{
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '1rem',
      height: CONTROL_HEIGHT,
      background: '#fff',
      cursor: 'pointer'
    }}
  >
    <option value="">All Countries</option>
    {countries.map(country => (
      <option key={country} value={country}>{country}</option>
    ))}
  </select>
);

export default CountrySelector;